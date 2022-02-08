import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AssetTypeService } from "@settings/asset/asset-type/asset-type.service";
import { switchMap, tap } from "rxjs/operators";
import { EmployeAssetService } from "../employe-asset.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "lodash";
import { forkJoin } from "rxjs";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";

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
  unallocatedAssets:any[]=[];
  unallocatedAssetsOndisplay:any[]=[];
  assetAllocationForm: FormGroup;
  requestedBy: string;
  searchParameter = '';
  checkedValues;
  isSelected = false;

  constructor(
    private employeeAsset: EmployeAssetService,
    private assetTypeService: AssetTypeService,
    private activatedRoute: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
  ) {}

  ngOnInit(): void {
    this.assetAllocationForm = this.createFormGroup();
    this.getAllocationDetails();
    this.getAssetType();
  }

  onSubmit() {
    console.log("formValues",this.assetAllocationForm.getRawValue());
    let allValues= {...this.assetAllocationForm.getRawValue(),};
    let changeValues={
      CommentsAllocator:allValues.CommentsAllocator,
      allocationId:allValues.allocationId,
      allocationTo:allValues.allocationTo,
      assetTypeId:this.checkedValues.assetTypeId,
      assetId:this.checkedValues.assetId,
      assetRaiseRequestId:this.reqId,
      assetMetadataValueId:this.checkedValues.assetMetadataValueId,
      empId:this.empid,
      assetName:this.checkedValues.assetName,
      allocatedDate:new Date(),
      status:4,
      description:this.checkedValues.description,
      metadataValueId2:this.checkedValues.metadataValueId2,
      metadataValueId3:this.checkedValues.metadataValueId3,
      metadataValueId4:this.checkedValues.metadataValueId4,
      metadataValueId5:this.checkedValues.metadataValueId5,
      assetTypeName:_.find(this.dataType,['id',this.checkedValues.assetTypeId]).assettypename
    };
    console.log(changeValues);
    forkJoin([
      this.employeeAsset.add(changeValues),
      this.employeeAsset.updateStatus(this.checkedValues.assetId,this.Astvalues.status)
    ]).subscribe(([result, asset]) => {
      console.log(asset);
      console.log(this.checkedValues.assetId.id,this.Astvalues.status);
    if (result.id === -1) {
      this.toastr.showErrorMessage('asset already swaped!');
    } else {
      this.toastr.showSuccessMessage('Allocated successfully successfully!');
      this.activeModal.close('submit');
    }
  },
  error => {
    console.error(error);
    this.toastr.showErrorMessage('Unable to Allocate the asset');
  });

    
  }

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
        this.requestedBy = `${result.firstName} ${result.lastName}`;
        this.assetAllocationForm.patchValue({ requestedBy: this.requestedBy });
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
      this.unallocatedAssets = this.unallocatedAssetsOndisplay = res;
      console.log("unallocated", this.unallocatedAssets);
  
    });
  }

  filterArray() {
    if (!this.searchParameter) {
      this.unallocatedAssetsOndisplay = this.unallocatedAssets;
    } else {
      const searchResult = [];
      const delimiter = '~!~';
      this.unallocatedAssets.forEach(ast => {
       let combinedString = ast.assetName + delimiter + ast.assetId + delimiter
                            + ast.description + delimiter+ ast.metadataValue1 + delimiter
                            + ast.metadataValue2 + delimiter+ ast.metadataValue3 + delimiter
                            + ast.metadataValue4 + delimiter+ ast.metadataValue5 + delimiter;
   
        if (combinedString.toLowerCase().indexOf(this.searchParameter.toLowerCase()) !== -1) {
        searchResult.push(ast);
        }
        console.log(combinedString);
      });
      this.unallocatedAssetsOndisplay = searchResult;
    }
  }

  onModelChange(unAllocatedAsset) {
    this.isSelected=true;
    console.log("checked values",unAllocatedAsset);
      this.checkedValues=unAllocatedAsset;
   }

 
          

          
         

      
  
  
}

