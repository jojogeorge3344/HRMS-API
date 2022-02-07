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
  typeid: number;
  reqDetails: any;
  assetList = [];
  dataType = [];
  unallocatedAssets: any;
  assetAllocationForm: FormGroup;
  requetedBy: string;
  searchParameter = '';
  allocationComponent: { id: number, values: EmployeeAssetAllocationComponent[] }[] = [];
  allocationComponentOnDisplay: { id: number, values: EmployeeAssetAllocationComponent[] }[] = [];
  componentsArray = [];

  constructor(
    private employeeAsset: EmployeAssetService,
    private assetTypeService: AssetTypeService,
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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
    this.employeeAsset.GetAssetAndMetadataDetails(this.typeid).subscribe((res) => {
      this.unallocatedAssets = res;
      console.log("unallocated", this.unallocatedAssets);

      this.unallocatedAssets.forEach((item) => {
        // this.allocationComponent.push({
        //   item: item.valueId,
        //   name: item.assetName,
        //   typeId: item.assetTypeId,
        //   assetId: item.id,
        // });
        this.allocationComponent = this.allocationComponentOnDisplay = item;
        // this.componentsArray = Array.from(component);
      });
      console.log("assetList",this.assetList);
    });
  }

  filterArray() {
    if (!this.searchParameter) {
      this.allocationComponentOnDisplay = this.allocationComponent;
    } else {
      const searchResult = [];
      const delimiter = '~!~';
      console.log(this.allocationComponent);
      
      // this.allocationComponent.forEach(ast => {
      //   console.log(ast);
      //   debugger;
      //   // let combinedString = ast.values[0].name + delimiter + ast.values[0].employeeCode + delimiter;
      //   // this.assetList.forEach(component => {
      //   //   combinedString += ast[component] + delimiter;
      //   // });
      //   // if (combinedString.toLowerCase().indexOf(this.searchParameter.toLowerCase()) !== -1) {
      //   // searchResult.push(ast);
      //   // }
      // });
      // this.allocationComponentOnDisplay = searchResult;
    }
  }

  getSearchedAsset(ev) {}
}
