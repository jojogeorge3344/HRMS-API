import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AssetTypeService } from "@settings/asset/asset-type/asset-type.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { EmployeAssetService } from "../employe-asset.service";
import { forkJoin, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "hrms-employee-asset-allocation",
  templateUrl: "./employee-asset-allocation.component.html",
})
export class EmployeeAssetAllocationComponent implements OnInit {
  @Input() reqId;
  @Input() empid;
  allocationDate: Date = new Date();
  reqData = {};
  // empid:number
  typeid: number;
  // reqId: number;
  reqDetails: any;
  assetList = [];
  dataType = [];
  unallocatedAssets: any;
  assetAllocationForm: FormGroup;
  requetedBy: string;

  constructor(
    private employeeAsset: EmployeAssetService,
    private assetTypeService: AssetTypeService,
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe((params: Params) => {
    //   console.log(params);
    //   this.empid = params.id;
    //   this.reqId=params.reqId;
    // });
    this.assetAllocationForm = this.createFormGroup();
    this.getAllocationDetails();
    this.getAssetType();
  }

  onSubmit() {}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      allocationId: ["", [Validators.required]],
      requestedBy: ["", []],
      // allocationDate: [new Date(Date.now()), [Validators.required]],
      description: ["", [Validators.required]],
      allocationTo: ["", [Validators.required]],
      requestNo: ["", [Validators.required]],
      CommentsAllocator: ["", [Validators.required]],
    });
  }

  getAllocationDetails() {
    this.employeeAsset
      .getAllocationDetails(this.reqId)
      .pipe(
        tap(([result]) => {
          this.assetAllocationForm.patchValue(result);
          this.reqDetails = result;
          console.log(this.reqDetails);
        }),
        switchMap(([result]) =>
          this.employeeAsset.getEmployeeNameById(result.requestedBy)
        )
      )
      .subscribe(([result]) => {
        this.requetedBy = `${result.firstName} ${result.lastName}`;
        this.assetAllocationForm.patchValue({ requestedBy: this.requetedBy });
      });
  }

  getAssetType() {
    this.assetTypeService.getAll().subscribe((result) => {
      this.dataType = result;
      console.log("assettype", this.dataType);
    });
  }

  getUnallocatedAssets(ev) {
    console.log(ev.target.value);
    this.typeid = ev.target.value;
    this.employeeAsset.getUnallocatedAssets(this.typeid).subscribe((res) => {
      this.unallocatedAssets = res;
      console.log("unallocated", this.unallocatedAssets);

      this.unallocatedAssets.forEach((item) => {
        console.log(item.valueId);
        this.assetList.push({
          item: item.valueId,
          name: item.assetName,
          typeId: item.assetTypeId,
          assetId: item.id,
        });
      });

      console.log(this.assetList);
      // this.assetList = res.filter(asset => (asset.valueId !== this.employeeassetchangeForm.value('valueId')));
    });
  }

  formatter = (assetList) => assetList.name;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter((term) => term.length >= 2),
      map((term) =>
        this.assetList
          .filter((assetList: any) =>
            new RegExp(term, "mi").test(assetList.name)
          )
          .slice(0, 10)
      )
    );

  getSearchedAsset(ev) {}
}
