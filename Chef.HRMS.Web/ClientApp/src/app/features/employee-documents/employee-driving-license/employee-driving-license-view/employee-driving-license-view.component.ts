import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hrms-employee-driving-license-view',
  templateUrl: './employee-driving-license-view.component.html'
})
export class EmployeeDrivingLicenseViewComponent implements OnInit {

  @Input() drivingLicense;
  
  constructor() { }

  ngOnInit(): void {  
  }  
}