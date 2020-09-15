import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'hrms-employee-pan-card-view',
  templateUrl: './employee-pan-card-view.component.html'
})
export class EmployeePANCardViewComponent implements OnInit {

  @Input() pan;
  
  constructor() { }

  ngOnInit(): void {  
  }  
}