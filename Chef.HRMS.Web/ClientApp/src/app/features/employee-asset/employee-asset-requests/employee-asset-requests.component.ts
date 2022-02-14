import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MyAssetsService } from "@features/employee-assets/my-assets/my-assets.service";
import { AssetAssetsService } from "@settings/asset/asset-assets/asset-assets.service";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { AssetStatus } from "src/app/models/common/types/assetstatus";
import { EmployeAssetService } from "../employe-asset.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { AssetRaiseRequest } from "@features/employee-assets/raise-request/raise-request.model";
import { EmployeeAssetRequestViewComponent } from "../employee-asset-request-view/employee-asset-request-view.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "hrms-employee-asset-requests",
  templateUrl: "./employee-asset-requests.component.html",
})
export class EmployeeAssetRequestsComponent implements OnInit {
  // assetStatus: AssetStatus;
  allocatedassets;
  assetId:number;
  currentUserId: number;
  assetRaiseRequestId:number;
  empid: string;
  employeeWiseRequest: AssetRaiseRequest;
  result: any;
  status=AssetStatus;
  id:[];
 

  constructor(
    private myAssetService: MyAssetsService,
    private assetService: AssetAssetsService,
    private employeeAsset: EmployeAssetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.params.subscribe((params: Params) => {
      this.empid = params.id;
    });
    this.getEmployeeRequestById();
  }

  getEmployeeRequestById() {
    return this.employeeAsset.getEmployeeRequestById(this.empid).subscribe((result) => {
      console.log(result);
        this.employeeWiseRequest = result;
        this.id=result.id;
       console.log(this.id);
      });

  }

  // openRequestView(employees) {
  //   this.router.navigate(
  //     ['./' + this.empid + '/requestview'],
  //     { relativeTo: this.route.parent });
  //     this.employeeAsset.setListDetails({data: employees})
  // }

  openRequestView(emprequest) {
    const modalRef = this.modalService.open(EmployeeAssetRequestViewComponent,
      { centered: true, backdrop: 'static' });
      modalRef.componentInstance.id = emprequest.id;
      modalRef.componentInstance.empid = this.empid;
      console.log(modalRef.componentInstance.requestId);
      this.employeeAsset.setListDetails({data: emprequest})
  }

  // getAllocatedAssetsById() {
  //   return this.employeeAsset.getAllocatedAssetsById(this.empid).subscribe((result) => {
  //       // this.allocatedassets = result;
  //       // this.assetId=result[0].assetId
  //      // console.log(this.allocatedassets);
  //     });
  // }
 


  manageRequest(empreq,status) {
     //  const parameters={assetId:this.assetId,requestId:this.assetRaiseRequestId,status:2}
     console.log(empreq.id);
        this.employeeAsset.manageRequest(empreq.id,status).subscribe(res=>{
          this.getEmployeeRequestById();
        })
       
    }

  // reject() {
  //   let addForm = this.addForm.getRawValue();
  //   addForm.numberOfDays = this.numberOfDays;
  //   addForm = {
  //     ...addForm,
  //     leaveStatus: 5,
  //     approvedBy: this.currentUserId,
  //     approvedDate: new Date(Date.now()),
  //     modifiedBy: this.currentUserId,
  //     modifiedDate: new Date(Date.now())
  //   };
  //   this.employeeLeaveService.update(addForm).subscribe((result) => {
  //     if (result) {
  //       this.toastr.showSuccessMessage('Leave Request rejected successfully');
  //       this.activeModal.close('submit');
  //     }
  //   });
  // }

  disableApproved(){
    console.log("hhhhh> ")
    return true;
  }



}
