import { DatePipe } from "@angular/common";
import { LocationStrategy } from "@angular/common";
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetAssets } from "@settings/asset/asset-assets/asset-assets.model";
import { AssetAssetsService } from "@settings/asset/asset-assets/asset-assets.service";
import { AssetMetadataService } from "@settings/asset/asset-metadata/asset-metadata.service";
import { componentDestroyed } from "@shared/utils/component.destroyed";
import { forkJoin } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { AssetChangeType } from "src/app/models/common/types/assetchangetype";
import { AssetReturnType } from "src/app/models/common/types/assetreturntype";
import { RequestType } from "src/app/models/common/types/requesttype";
import { SplitByUpperCasePipe } from "src/app/pipes/split-by-upper-case.pipe";
import { EmployeAssetService } from "../employe-asset.service";

@Component({
  selector: "hrms-employee-asset-changereturnview",
  templateUrl: "./employee-asset-changereturnview.component.html",
})
export class EmployeeAssetChangereturnviewComponent
  implements OnInit, OnDestroy
{
  //  @Input() requestType
  @Input() assetTypeId;
  @Input() status;
  @Input() assetRaiseRequestId;
  @Input() empid;
  returnDate: Date;
  assetTypeName: string;
  comments: string;
  reason: string;
  assetChangeType = AssetChangeType;
  assetReturnType = AssetReturnType;
  Astvalues: AssetAssets;
  assetId: number;
  employeeassetchangeReturnForm: FormGroup;
  typeMap: Map<any, any>;
  typeKeys: string[];
  returnType: number;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private employeeAsset: EmployeAssetService,
    private assestassetService: AssetAssetsService,
    private assetMetadataService: AssetMetadataService,
    private splitByUpperCase: SplitByUpperCasePipe,
    private datepipe: DatePipe,
    private location: LocationStrategy
  ) {}
  ngOnDestroy(): void {
    console.log("called");
    // this.activeModal.close();
    // this.activeModal.dismiss();
  }

  ngOnInit(): void {
    this.typeMap = new Map();
    this.getAssetId();
    this.employeeassetchangeReturnForm = this.createFormGroup();
    // this.preventBack();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      valueId: [{ value: "", disabled: true }, [Validators.required]],
      returnDate: [{ value: "", disabled: true }, [Validators.required]],
      assetTypeName: [{ value: "", disabled: true }, [Validators.required]],
      assetName: [{ value: "", disabled: true }, [Validators.required]],
      metadatas: this.formBuilder.group([]),
      reason: [{ value: "", disabled: true }, []],
      comments: [{ value: "", disabled: true }, []],
    });
  }

  getAssetId() {
    this.employeeAsset
      .getAssetId(this.assetRaiseRequestId)
      .pipe(takeUntil(componentDestroyed(this)))
      .subscribe((res) => {
        this.assetId = res[0].assetId;
        this.assetTypeName = res[0].assetTypeName;
        this.returnDate = res[0].returnDate;
        this.employeeassetchangeReturnForm.patchValue({
          assetTypeName: this.assetTypeName,
          returnDate: this.datepipe.transform(this.returnDate, "dd-MM-yyyy"),
        });
        if (res[0].assetId) {
          this.getCurrentAssetById();
          this.getReasonAndDescription();
        }
      });
  }

  getReasonAndDescription() {
    this.employeeAsset
      .getReasonAndDescription(
        this.assetRaiseRequestId,
        this.status,
        this.assetId
      )
      .subscribe((res) => {
        this.returnType = res[0].type;
        if (res[0].type == RequestType.ChangeAsset) {
          this.comments = res[0].comments;
          this.reason = this.assetChangeType[res[0].reason];
          console.log(this.assetChangeType[res[0].reason]);

          this.employeeassetchangeReturnForm.patchValue({
            comments: this.comments,
            reason: this.splitByUpperCase.transform(this.reason),
          });
        } else if (res[0].type == RequestType.ReturnAsset) {
          this.comments = res[0].comments;
          this.reason = this.assetReturnType[res[0].reason];
          console.log(this.assetReturnType[res[0].reason]);

          this.employeeassetchangeReturnForm.patchValue({
            comments: this.comments,
            reason: this.splitByUpperCase.transform(this.reason),
          });
        }
        console.log("reason and description", res);
      });
  }

  getCurrentAssetById() {
    console.log("assetid", this.assetId);
    forkJoin([
      this.assetMetadataService.getAssetMetadataById(this.assetTypeId),
      this.assestassetService.getAssetById(this.assetId),
    ]).subscribe(([metadatas, asset]) => {
      console.log("metadatas", metadatas);
      metadatas.forEach((mdata) => {
        this.typeMap.set(mdata.metadata, mdata);
        (
          this.employeeassetchangeReturnForm.get("metadatas") as FormGroup
        ).addControl(
          mdata["metadata"],
          new FormControl("", [Validators.required])
        );
      });
      this.typeKeys = [...this.typeMap.keys()];
      let mdatavalue = {};
      console.log("typeks", this.typeKeys);

      this.typeKeys.map((key) => {
        mdatavalue[key] =
          asset.assetMetadataValues.find(
            (mvalue) => mvalue.assettypeMetadataId === this.typeMap.get(key).id
          )?.value || "";
      });
      this.employeeassetchangeReturnForm.patchValue({
        ...asset,
        metadatas: mdatavalue,
      });
      this.Astvalues = asset;
    });
  }
}
