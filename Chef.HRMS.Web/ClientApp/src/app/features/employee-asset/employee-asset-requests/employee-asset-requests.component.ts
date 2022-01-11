import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { getCurrentUserId } from "@shared/utils/utils.functions";
import { AssetStatus } from "src/app/models/common/types/assetstatus";
import { AssetEmployeewiseRequest } from "../assetemployeewiserequest.model";
import { EmployeAssetService } from "../employe-asset.service";

@Component({
  selector: "hrms-employee-asset-requests",
  templateUrl: "./employee-asset-requests.component.html",
})
export class EmployeeAssetRequestsComponent implements OnInit {
  assetStatus: AssetStatus;
  currentUserId: number;
  empid: string;
  employeeWiseRequest: AssetEmployeewiseRequest;
  result: any;

  constructor(
    private employeeAsset: EmployeAssetService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.route.params.subscribe((params: Params) => {
      console.log(params);
      this.empid = params.id;
    });
    this.getEmployeeRequestById();
  }

  getEmployeeRequestById() {
    console.log(this.empid);

    return this.employeeAsset
      .getEmployeeRequestById(this.empid)

      .subscribe((result) => {
        this.employeeWiseRequest = result;
        console.log(this.employeeWiseRequest);
      });

  }

  openView(employees) {
    this.router.navigate(
      ['./' + this.empid + '/requestview'],
      { relativeTo: this.route.parent });
      this.employeeAsset.setListDetails({data: employees})
  }

  Approve() {
    this.assetStatus=2;
    
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
