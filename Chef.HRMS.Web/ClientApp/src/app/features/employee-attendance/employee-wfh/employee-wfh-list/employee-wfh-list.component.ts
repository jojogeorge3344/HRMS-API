import { Component, OnInit } from '@angular/core';
import { EmployeeWFHService } from '../employee-wfh.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-wfh-list',
  templateUrl: './employee-wfh-list.component.html'
})
export class EmployeeWFHListComponent implements OnInit {

  currentUserId: number;
  workFromHomeRequest: any;

  constructor(
    private toastr: ToasterDisplayService,
    private employeeWFHService: EmployeeWFHService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getAttendanceWorkFromHomeById();
  }

  getAttendanceWorkFromHomeById() {
    this.employeeWFHService.getAllWorkFromHomeById(this.currentUserId).subscribe(result => {
      this.workFromHomeRequest = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Work From Home request');
    });
  }

}
