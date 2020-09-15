import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'hrms-employee-uid-view',
  templateUrl: './employee-uid-view.component.html'
})
export class EmployeeUIDViewComponent implements OnInit {

  @Input() uid;
  
  constructor() { }

  ngOnInit(): void {  
  }  
}