import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-view',
  templateUrl: './employee-asset-view.component.html',
})
export class EmployeeAssetViewComponent implements OnInit{
  empid:number;
  result:[];
  employeeDetails
  

  constructor(private employeeAsset :EmployeAssetService,
              private activatedRoute: ActivatedRoute
              ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.empid = params.id;
    });
    // this.employeeAsset.getListDetails().subscribe(
    //   response=>{
    //       console.log(response);
    //       this.result=response;
    //   }
    // )
    this.getEmployeeDetailsById()
  }

  getEmployeeDetailsById(){
    return this.employeeAsset.getEmployeeDetailsById(this.empid).subscribe((result) => {
      this.employeeDetails = result;
      console.log(this.employeeDetails);
    });
  }


}
