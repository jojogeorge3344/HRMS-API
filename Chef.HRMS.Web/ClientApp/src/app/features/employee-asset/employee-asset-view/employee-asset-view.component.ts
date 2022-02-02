import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { WorkerType } from 'src/app/models/common/types/workertype';
import { EmployeAssetService } from '../employe-asset.service';
import { EmployeeAssetChangeorswapComponent } from '../employee-asset-changeorswap/employee-asset-changeorswap.component';

@Component({
  selector: 'hrms-employee-asset-view',
  templateUrl: './employee-asset-view.component.html',
})
export class EmployeeAssetViewComponent implements OnInit{
  empid:number;
  result:[];
  employeeDetails;
  allocatedAssets;
  status=AssetStatus;
  empStatus=WorkerType;
  assetId:number;
  assetTypeId:number;
  

  constructor(private employeeAsset :EmployeAssetService,
              private activatedRoute: ActivatedRoute,
              public modalService: NgbModal,
              private toastr: ToasterDisplayService
              ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.empid = params.id;
    });
    this.getEmployeeDetailsById()
    this.getAllocatedAssetsById();
  }


  getAllocatedAssetsById() {
    console.log(this.empid);
    return this.employeeAsset.getAllocatedAssetsById(this.empid).subscribe((result) => {
        this.allocatedAssets = result;
        console.log("allocated assets",this.allocatedAssets);
      });
  }

  getEmployeeDetailsById(){
    return this.employeeAsset.getEmployeeDetailsById(this.empid).subscribe((result) => {
      this.employeeDetails = result;
      console.log(this.employeeDetails);
    });
  }

  openChangeOrSwap(allocatedAsset) {
     const modalRef = this.modalService.open(EmployeeAssetChangeorswapComponent,
       { centered: true, backdrop: 'static' });
      modalRef.componentInstance.assetRaiseRequestId=allocatedAsset.assetRaiseRequestId
      modalRef.componentInstance.empid=allocatedAsset.empId
      modalRef.componentInstance.assetTypeName=allocatedAsset.assetTypeName
      modalRef.componentInstance.assetId= allocatedAsset.assetId;
      modalRef.componentInstance.assetTypeId = allocatedAsset.assetTypeId;
   
   }

   openRecall(allocatedAsset) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
      debugger;
     modalRef.componentInstance.confirmationMessage = `Are you sure you want to recall the asset ${allocatedAsset.assetName}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeAsset.recall(this.empid,allocatedAsset.assetId,4).subscribe(() => {
           this.toastr.showSuccessMessage('asset recalled successfully!');
          this.getAllocatedAssetsById();
        });
      }
    });
  }


}
