import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { MyAssetsService } from "@features/employee-assets/my-assets/my-assets.service";
import { AssetAssetsService } from "@settings/asset/asset-assets/asset-assets.service";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { AssetStatus } from "src/app/models/common/types/assetstatus";
import { EmployeAssetService } from "../employe-asset.service";
import { ToasterDisplayService } from "src/app/core/services/toaster-service.service";
import { AssetRaiseRequest } from "@features/employee-assets/raise-request/raise-request.model";

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
 

  constructor(
    private myAssetService: MyAssetsService,
    private assetService: AssetAssetsService,
    private employeeAsset: EmployeAssetService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.params.subscribe((params: Params) => {
      this.empid = params.id;
    });
    this.getEmployeeRequestById();
    // this.getAllocatedAssetsById()
  }

  getEmployeeRequestById() {
    //console.log(this.empid);

    return this.employeeAsset.getEmployeeRequestById(this.empid).subscribe((result) => {
        this.employeeWiseRequest = result;
        this.assetRaiseRequestId=result[0].id;
       console.log(this.employeeWiseRequest);
      });

  }

  openRequestView(employees) {
    this.router.navigate(
      ['./' + this.empid + '/requestview'],
      { relativeTo: this.route.parent });
      this.employeeAsset.setListDetails({data: employees})
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



}
