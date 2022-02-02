import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-allocation',
  templateUrl: './employee-asset-allocation.component.html',
})
export class EmployeeAssetAllocationComponent implements OnInit {
  reqData={};
  reqId: number;
  reqDetails=[];

  constructor(private employeeAsset:EmployeAssetService,) { }

  ngOnInit(): void {
    this.getDetails()
    this.getAllocationDetails()
  }

  getDetails(){
    this.employeeAsset.getListDetails().subscribe(res =>{
        this.reqId=res.data.id
        console.log(this.reqId);
    });
  }

  getAllocationDetails(){
    this.employeeAsset.getAllocationDetails(this.reqId).subscribe(res => {
      this.reqDetails=res;
      console.log(this.reqDetails);
    })
  }

}
