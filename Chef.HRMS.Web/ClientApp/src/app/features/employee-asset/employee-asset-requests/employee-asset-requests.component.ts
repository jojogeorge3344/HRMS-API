import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { AssetStatus } from "src/app/models/common/types/assetstatus";
import { EmployeAssetService } from "../employe-asset.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { AssetRaiseRequest } from "@features/employee-assets/raise-request/raise-request.model";
import { EmployeeAssetRequestViewComponent } from "../employee-asset-request-view/employee-asset-request-view.component";
import { NgbActiveModal, NgbModal,  }from '@ng-bootstrap/ng-bootstrap';
import { RequestFor } from "src/app/models/common/types/requestfor";
import { ConfirmModalComponent } from "@shared/dialogs/confirm-modal/confirm-modal.component";
import { EmployeeAssetAllocationComponent } from "../employee-asset-allocation/employee-asset-allocation.component";
import { EmployeeAssetChangereturnviewComponent } from "../employee-asset-changereturnview/employee-asset-changereturnview.component";
import { RequestType } from "src/app/models/common/types/requesttype";
import { EmployeeAssetChangeorswapComponent } from "../employee-asset-changeorswap/employee-asset-changeorswap.component";

@Component({
  selector: "hrms-employee-asset-requests",
  templateUrl: "./employee-asset-requests.component.html",
})
export class EmployeeAssetRequestsComponent implements OnInit {
  // assetStatus: AssetStatus;
  allocatedassets;
  assetId: {};
  currentUserId: number;
  assetRaiseRequestId: number;
  empid: string;
  employeeWiseRequest: AssetRaiseRequest;
  result: any;
  status = AssetStatus;
  reqForStatus = RequestFor;
  id: [];
  reqid: number;
  assetTypeId: number;
  assetTypeName: string;
  raiseRequestTypeList = RequestType;

  constructor(
    private employeeAsset: EmployeAssetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.params.subscribe((params: Params) => {
      this.empid = params.id;
    });
    this.getEmployeeRequestById();
  }

  getEmployeeRequestById() {
    return this.employeeAsset
      .getEmployeeRequestById(this.empid).subscribe((result) => {
        console.log(result);
        this.employeeWiseRequest = result;
        this.reqid = result.id;
        console.log("request details>>",this.employeeWiseRequest);
      });
  }

  openRequestView(emprequest) {
    const modalRef = this.modalService.open(EmployeeAssetRequestViewComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.result.then((userResponse) => {
      if(userResponse){
        this.getEmployeeRequestById();
      }  
    })
    modalRef.componentInstance.id = emprequest.id;
    modalRef.componentInstance.empid = this.empid;
    modalRef.componentInstance.assetTypeId = emprequest.assetTypeId;
    modalRef.componentInstance.assetTypeName = emprequest.assetTypeName;
    console.log(modalRef.componentInstance.requestId);
    this.employeeAsset.setListDetails({ data: emprequest });
  }

  // getAllocatedAssetID(){
  //   this.employeeAsset.getAssetId(emprequest.id).subscribe((res) => { 
  //     this.assetId=res; 
  //   })
  // }

  openChangeRequestView(emprequest) {
    const modalRef = this.modalService.open(EmployeeAssetChangereturnviewComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.result.then((userResponse) => {
      if(userResponse){
        this.getEmployeeRequestById();
      }  
    }) 
    modalRef.componentInstance.status=emprequest.status;
    // modalRef.componentInstance.assetId=this.assetId;
    modalRef.componentInstance.assetRaiseRequestId = emprequest.id;
    modalRef.componentInstance.empid = this.empid;
    modalRef.componentInstance.assetTypeId = emprequest.assetTypeId;
    modalRef.componentInstance.assetTypeName = emprequest.assetTypeName;
    this.employeeAsset.setListDetails({ data: emprequest });
  }

  openChangeOrSwap(emprequest) {
    const modalRef = this.modalService.open(EmployeeAssetChangeorswapComponent,
      { centered: true, backdrop: 'static' });
     modalRef.componentInstance.assetRaiseRequestId=emprequest.id;
     modalRef.componentInstance.empid=this.empid;
     modalRef.componentInstance.assetTypeName=emprequest.assetTypeName;
     modalRef.componentInstance.assetTypeId =  emprequest.assetTypeId;
     modalRef.result.then((userResponse) => {
      this.getEmployeeRequestById();
     })
  
  }

  openAllocate(emprequest){
    this.router.navigate(
      ['./' + this.empid + '/allocation/'+emprequest.id +'/'+emprequest.assetTypeId + '/' + emprequest.assetTypeName ],
      { relativeTo: this.route.parent });
      console.log("emws",emprequest);
      // this.employeeAsset.setListDetails({data: emprequest})
  }



  // openAllocate(emprequest) {
  //   const modalRef = this.modalService.open(EmployeeAssetAllocationComponent, {
  //     centered: true,
  //     backdrop: "static",
  //     size:'xl'
  //   });
  //   modalRef.result.then((userResponse) => {
  //     this.getEmployeeRequestById();
  //   })
  //   modalRef.componentInstance.reqId = emprequest.id;
  //   modalRef.componentInstance.empid = this.empid;
  //   modalRef.componentInstance.assetTypeId = emprequest.assetTypeId;
  //   modalRef.componentInstance.assetTypeName = emprequest.assetTypeName;
  //   console.log(modalRef.componentInstance.assetTypeName);
  //   // this.employeeAsset.setListDetails({ data: emprequest });
  // }


  // getAllocatedAssetsById() {
  //   return this.employeeAsset.getAllocatedAssetsById(this.empid).subscribe((result) => {
  //       this.allocatedassets = result;
  //       this.assetId=result[0].assetId
  //      console.log(this.allocatedassets);
  //     });
  // }

  manageRequest(emprequest, status) {
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      size: 'lg',
      centered: true,
      backdrop: "static",
    });
    console.log(emprequest);
    const empreqid = emprequest.id;
    if (status == 2) {
      modalRef.componentInstance.confirmationMessage = `Are you sure you want to approve the request ?`;
    } else if (status == 3) {
      modalRef.componentInstance.confirmationMessage = `Are you sure you want to reject the request ?`;
    }
    else if (status == 6) {
      modalRef.componentInstance.confirmationMessage = `Are you sure you want to revoke the request ?`;
    }

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.employeeAsset.manageRequest(empreqid, status).subscribe((res) => {
          console.log(res);
          if (status == 2) {
            this.toastr.showSuccessMessage("request approved successfully!");
          } else if (status == 3) {
            this.toastr.showSuccessMessage("request rejected successfully!");
          }
          else if (status == 6) {
            this.toastr.showSuccessMessage("request revoked successfully!");
          }
          this.activeModal.close("click");
          this.getEmployeeRequestById();
        });
      }
    });
    
  }




}
