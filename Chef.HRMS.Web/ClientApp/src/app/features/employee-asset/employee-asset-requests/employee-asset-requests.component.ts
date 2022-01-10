import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { AssetEmployeewiseRequest } from "../assetemployeewiserequest.model";
import { EmployeAssetService } from "../employe-asset.service";

@Component({
  selector: "hrms-employee-asset-requests",
  templateUrl: "./employee-asset-requests.component.html",
})
export class EmployeeAssetRequestsComponent implements OnInit {
  empid: string;
  employeeWiseRequest: AssetEmployeewiseRequest;

  constructor(
    private employeeAsset: EmployeAssetService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
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
}
