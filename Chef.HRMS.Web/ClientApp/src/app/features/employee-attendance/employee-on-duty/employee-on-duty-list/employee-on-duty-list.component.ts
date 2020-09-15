import { Component, OnInit } from '@angular/core';
import { EmployeeOnDutyService } from '../employee-on-duty.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-on-duty-list',
  templateUrl: './employee-on-duty-list.component.html'
})
export class EmployeeOnDutyListComponent implements OnInit {

  currentUserId: number;
  onDutyRequest: any;

  constructor(
    private toastr: ToasterDisplayService,
    private employeeOnDutyService: EmployeeOnDutyService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getAttendanceOnDutyRequestById();
  }

  getAttendanceOnDutyRequestById() {
    this.employeeOnDutyService.getTotalRequestedDaysById(this.currentUserId).subscribe(result => {
      this.onDutyRequest = result;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the On Duty request');
    });
  }

}
