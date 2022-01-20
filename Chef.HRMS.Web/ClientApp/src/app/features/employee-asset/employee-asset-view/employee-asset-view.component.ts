import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
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
        console.log(this.allocatedAssets);
      });
  }

  getEmployeeDetailsById(){
    return this.employeeAsset.getEmployeeDetailsById(this.empid).subscribe((result) => {
      this.employeeDetails = result;
      console.log(this.employeeDetails);
    });
  }

  openChangeOrSwap(employeeId,allocatedAssetId) {
     const modalRef = this.modalService.open(EmployeeAssetChangeorswapComponent,
       { centered: true, backdrop: 'static' });
    //  modalRef.componentInstance.employeeId = this.employeeDetails.id;
    //  modalRef.componentInstance.allocatedAssetId = this.allocatedAssets.id;
    //  console.log(modalRef.componentInstance.employeeId, modalRef.componentInstance.allocatedAssetId);
   }

   openRecall(assetId) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

     modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset ${assetId['assetName']}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeAsset.recall(assetId).subscribe(() => {
          // this.toastr.showSuccessMessage('asset deleted successfully!');
          this.getAllocatedAssetsById();
        });
      }
    });
  }


}
