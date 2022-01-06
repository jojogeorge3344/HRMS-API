import { Component, OnInit } from '@angular/core';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-allocated',
  templateUrl: './employee-asset-allocated.component.html',
})
export class EmployeeAssetAllocatedComponent implements OnInit {
  empid:number;
  result:[];

  constructor(private employeeAsset :EmployeAssetService,) { }

  ngOnInit(): void {

    this.employeeAsset.getListDetails().subscribe(
      response=>{
          console.log(response);
          this.result=response;
      }
    )
    
  }

}
