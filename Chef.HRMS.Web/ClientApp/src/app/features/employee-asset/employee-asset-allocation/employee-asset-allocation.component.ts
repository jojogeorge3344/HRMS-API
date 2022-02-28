import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AssetTypeService } from "@settings/asset/asset-type/asset-type.service";
import { switchMap, tap } from "rxjs/operators";
import { EmployeAssetService } from "../employe-asset.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "lodash";
import { forkJoin } from "rxjs";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { AssetMetadataService } from "@settings/asset/asset-metadata/asset-metadata.service";

@Component({
  selector: "hrms-employee-asset-allocation",
  templateUrl: "./employee-asset-allocation.component.html",
})
export class EmployeeAssetAllocationComponent implements OnInit {
  allocationDate: Date = new Date();
  empid:number;
  reqId:number;
  assetTypeName:string;
  reqData = {};
  typeid: number;
  reqDetails: any;
  assetList = [];
  dataTypes = [];
  unallocatedAssets:any[]=[];
  unallocatedAssetsOndisplay:any[]=[];
  assetAllocationForm: FormGroup;
  requestedBy: string;
  searchParameter = '';
  checkedValues;
  isSelected = false;

  constructor(
    private employeeAsset: EmployeAssetService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private metadataService:AssetMetadataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.empid = params.id;
      this.reqId=params.reqId;
      this.typeid=params.typeId;
      this.assetTypeName=params.assetTypeName;
    });
     this.assetAllocationForm = this.createFormGroup();
    this.getAllocationDetails();
    this.getAsset();
    // this.getUnallocatedAssets();
    // console.log("assetTypeName>>", this.assetTypeName);
    
  }

  onSubmit() {
    console.log("formValues",this.assetAllocationForm.getRawValue());
    let allValues= {...this.assetAllocationForm.getRawValue(),};
    let changeValues={
      allocatorcomments:allValues.CommentsAllocator,
      allocationId:allValues.allocationId,
      allocationTo:allValues.allocationTo,
      empId:this.reqDetails.nameOfTeamMemberId,
      assetTypeId:this.checkedValues.assetTypeId,
      assetId:this.checkedValues.assetId,
      assetRaiseRequestId:this.reqId,
      assetMetadataValueId:this.checkedValues.assetMetadataValueId,
      // empId:this.empid,
      assetName:this.checkedValues.assetName,
      allocatedDate:new Date(),
      status:4,
      description:this.checkedValues.description,
      metadataValueId2:this.checkedValues.metadataValueId2,
      metadataValueId3:this.checkedValues.metadataValueId3,
      metadataValueId4:this.checkedValues.metadataValueId4,
      metadataValueId5:this.checkedValues.metadataValueId5,
      assetTypeName:this.assetTypeName
    };
    console.log(changeValues);
    forkJoin([
      this.employeeAsset.add([changeValues]),
      this.employeeAsset.updateAllocateStatus(this.checkedValues.assetId,this.reqId,this.checkedValues.status)
    ]).subscribe(([result, asset]) => {
      console.log(asset);
      console.log(this.checkedValues.assetId,this.checkedValues.status);
    if (result.id === -1) {
      this.toastr.showErrorMessage('Asset already Allocated!');
    } else {
      this.toastr.showSuccessMessage('Asset Allocated successfully!');
    }
  },
  error => {
    console.error(error);
    this.toastr.showErrorMessage('Unable to Allocate the asset');
  });
  this.router.navigateByUrl('asset-employee-wise/' + this.empid + '/requests')
    
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      //allocationId: [[]],
      requestedBy: ["", []],
      // allocationDate: [new Date(Date.now()), [Validators.required]],
      description: ["", [Validators.required]],
      allocationTo: ["", [Validators.required]],
      requestNo: ["", [Validators.required]],
      CommentsAllocator: ["", [Validators.required, Validators.maxLength(150)]],
    });
  }

  getAllocationDetails() {
    this.employeeAsset
      .getAllocationDetails(this.reqId)
      .pipe(
        tap(([result]) => {
          this.assetAllocationForm.patchValue(result);
          this.reqDetails = result;
          console.log("request details",this.reqDetails);
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


  getAsset(){
    forkJoin([
      this.metadataService.getAssetMetadataById(this.typeid),
      this.employeeAsset.GetAssetAndMetadataDetails(this.typeid)
    ]).subscribe(([result, asset]) => {
      this.dataTypes = result;
      this.unallocatedAssets = this.unallocatedAssetsOndisplay = asset;
      console.log(asset);
      console.log(result);
  });
  }
 

  // getAssetType() {
  //   this.metadataService.getAssetMetadataById(this.assetTypeId).subscribe((result) => {
  //     this.dataTypes = result;
  //     console.log("assettype", this.dataTypes);
  //   });
  // }

  // getUnallocatedAssets() {
  //   // this.typeid = ev.target.value;
  //   this.employeeAsset.GetAssetAndMetadataDetails(this.assetTypeId).subscribe((res) => {
  //     this.unallocatedAssets = this.unallocatedAssetsOndisplay = res;
  //     console.log("unallocated", this.unallocatedAssets);
  
  //   });
  // }

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
   
   Cancel(){
    this.router.navigateByUrl('asset-employee-wise/' + this.empid + '/requests')
   }

 
          

          
         

      
  
  
}

