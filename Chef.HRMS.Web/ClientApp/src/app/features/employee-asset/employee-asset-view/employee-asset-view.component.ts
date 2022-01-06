import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hrms-employee-asset-view',
  templateUrl: './employee-asset-view.component.html',
})
export class EmployeeAssetViewComponent implements OnInit {
  @Input() employees;

  constructor() { }

  ngOnInit(): void {
    console.log(this.employees);
    
  }

}
