import { Component, Input, OnInit} from '@angular/core';
import { EmployeAssetService } from '../employe-asset.service';

@Component({
  selector: 'hrms-employee-asset-view',
  templateUrl: './employee-asset-view.component.html',
})
export class EmployeeAssetViewComponent implements OnInit{
  empid:number;
  result:[];
  

  constructor(private employeeAsset :EmployeAssetService,
              ) { }


  ngOnInit(): void {
    this.employeeAsset.getListDetails().subscribe(
      response=>{
          console.log(response);
          this.result=response;
      }
    )
  }


}
