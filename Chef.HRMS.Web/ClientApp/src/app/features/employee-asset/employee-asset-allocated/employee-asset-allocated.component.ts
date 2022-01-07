import { Component, OnInit } from '@angular/core';
import { AllocatedAssets } from '../allocatedassets.model';
import { EmployeAssetService } from '../employe-asset.service';
import { AssetEmployeeWise } from '../employee-asset.model';

@Component({
  selector: 'hrms-employee-asset-allocated',
  templateUrl: './employee-asset-allocated.component.html',
})
export class EmployeeAssetAllocatedComponent implements OnInit {
  empid:number;
  result: AssetEmployeeWise[];
  allocatedAssets:AllocatedAssets; 

  constructor(private employeeAsset :EmployeAssetService,) { }

  ngOnInit(): void {
    this.getEmpId();
    this.getEmployeeRequestById(); 
    }

  getEmpId() {
    this.employeeAsset.getListDetails().subscribe(
      response=>{
          // console.log(response);
          this.empid=response.data.id;
      }
    )
  }
  
  getEmployeeRequestById() {
    console.log(this.empid);
    this.employeeAsset.getEmployeeRequestById(this.empid).subscribe( result => {
      console.log(result);
      this.allocatedAssets=result;
    })
  }

}
