import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from "@features/employee/employee.service";
import { EmployeeJobTitle } from '../employee-job-title.model';

@Component({
  selector: 'hrms-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  employeeList;

  @Input() jobTitle: EmployeeJobTitle;

  constructor(public activeModal: NgbActiveModal,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.getEmployeeDetailsByJobTile(this.jobTitle.id).subscribe(result => {
      this.employeeList = result;
    },
    error => {
      console.error(error);
    });
  }

}
