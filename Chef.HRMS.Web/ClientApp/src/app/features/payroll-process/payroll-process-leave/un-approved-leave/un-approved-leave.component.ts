import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PayrollProcessLeaveService } from '../payroll-process-leave.service';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';
import { EmployeeLeaveService } from '../../../employee-leave/employee-leave.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-un-approved-leave',
  templateUrl: './un-approved-leave.component.html'
})
export class UnApprovedLeaveComponent implements OnInit {

  @Input() employeeId: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() employeeName: any;
  requestStatus = RequestStatus;

  unapprovedLeaveDetails = [];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private payrollProcessLeaveService: PayrollProcessLeaveService,
    private employeeLeaveService: EmployeeLeaveService
  ) { }

  ngOnInit(): void {
    this.getAllUnapprovedLeaveDetailsByEmployeeId();
  }

  getAllUnapprovedLeaveDetailsByEmployeeId() {
    this.payrollProcessLeaveService.getAllUnapprovedLeaveDetails(this.employeeId, this.fromDate, this.toDate).subscribe(result => {
      this.unapprovedLeaveDetails = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the All Unapproved Leave Details By Employee ID');
      });
  }

  approveLeave(unApprovedLeave) {
    unApprovedLeave = {
      ...unApprovedLeave,
      leaveStatus: this.requestStatus.Approved,
      approvedDate: new Date()
    };
    this.employeeLeaveService.update(unApprovedLeave).subscribe(result => {
      this.toastr.showSuccessMessage('The Leave Status updated successfully');
      this.getAllUnapprovedLeaveDetailsByEmployeeId();
      // this.activeModal.close("submit");
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the Leave Status');
      });
  }

  rejectLeave(unApprovedLeave) {
    unApprovedLeave = {
      ...unApprovedLeave,
      leaveStatus: this.requestStatus.Rejected,
      approvedDate: new Date()
    };
    this.employeeLeaveService.update(unApprovedLeave).subscribe(result => {
      this.toastr.showSuccessMessage('The Leave Status rejected successfully');
      this.getAllUnapprovedLeaveDetailsByEmployeeId();
      // this.activeModal.close("submit");
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to reject the Leave Status');
      });
  }

}
