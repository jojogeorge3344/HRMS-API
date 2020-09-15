import { Component, OnInit, Input } from '@angular/core';
import { EmployeePassportDetails } from './../employee-passport-details.model';

@Component({
  selector: 'hrms-employee-passport-view',
  templateUrl: './employee-passport-view.component.html'
})
export class EmployeePassportViewComponent implements OnInit {

  @Input() passport: EmployeePassportDetails;
  
  constructor() { }

  ngOnInit(): void {  
  }  
}