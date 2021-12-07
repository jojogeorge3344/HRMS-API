import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PayrollProcessLeaveService } from '../payroll-process-leave.service';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';
import { EmployeeLeaveService } from '../../../employee-leave/employee-leave.service';
import { EmployeeLeaveBalance } from '../../../employee-leave/employee-leave-balance.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeOnDutyService } from '@features/employee-attendance/employee-on-duty/employee-on-duty.service';
import { EmployeeService } from '@features/employee/employee.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-un-marked-leave',
  templateUrl: './un-marked-leave.component.html'
})
export class UnMarkedLeaveComponent implements OnInit {

  @Input() employeeId: any;
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() employeeName: any;
  @Input() loginUserId: any;
  requestStatus = RequestStatus;
  leaveStructurelId: number;
  unMarkedLeaveDetails: any = [];
  leaveBalance: EmployeeLeaveBalance[];
  selectedLeaveComponent: EmployeeLeaveBalance;
  preventSingleClick = false;
  timer: any;
  delay: number;
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private payrollProcessLeaveService: PayrollProcessLeaveService,
    private employeeLeaveService: EmployeeLeaveService,
    private employeeOnDutyService: EmployeeOnDutyService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loginUserId = getCurrentUserId();
    this.getAllUnMarkedLeaveDetailsByEmployeeId();
    this.getLeaveBalance();
    this.getEmployeeDetails();
  }
  getEmployeeDetails() {
    this.employeeService.getDetails(this.employeeId).subscribe(result => {
      this.leaveStructurelId = result.leaveStructureId;
    },
      error => {
        console.error(error);
      });
  }
  doubleClick() {
    this.preventSingleClick = true;
    clearTimeout(this.timer);
    this.toastr.showWarningMessage('Double clicking is not allowed');
  }
  getAllUnMarkedLeaveDetailsByEmployeeId() {
    this.payrollProcessLeaveService.getAllUnmarkedAttendanceDetails(this.employeeId, this.fromDate, this.toDate).subscribe(result => {
      this.unMarkedLeaveDetails = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the All UnMarked Leave Details By Employee ID');
      });
  }

  getLeaveBalance() {
    this.employeeLeaveService.getAllLeaveBalance(this.employeeId).subscribe(result => {
      result = result.filter((arr: any) => {
        return ((arr.restrictedToGender && (arr.gender == arr.restrictedToGender)) || !arr.restrictedToGender) &&
          ((arr.restrictedToMaritalStatus && (arr.maritalStatus == arr.restrictedToMaritalStatus)) || !arr.isrestrictedToMaritalStatus);
        // return(((arr.leaveComponentName == 'Maternity Leave' || arr.leaveComponentName == 'Paternity Leave') &&
        // (arr.gender == arr.restrictedToGender && arr.maritalStatus == arr.restrictedToMaritalStatus)) || !(arr.leaveComponentName == 'Maternity Leave' || arr.leaveComponentName == 'Paternity Leave'))
      });
      this.leaveBalance = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Balance');
      });
  }

  setLeaveComponent(id) {
    this.selectedLeaveComponent = this.leaveBalance.find((leaveComponent) => leaveComponent.leaveComponentId == id);
  }

  approveUnmarkedLeave(unMarkedLeave) {
    if (unMarkedLeave.leaveComponentId == 0) {
      this.toastr.showErrorMessage('Please select leave type');
      return;
    }
    unMarkedLeave = {
      // ...unMarkedLeave,
      fromDate: unMarkedLeave.date,
      toDate: unMarkedLeave.date,
      employeeId: this.employeeId,
      approvedBy: this.loginUserId,
      approvedDate: new Date(),
      description: 'Approved By HR',
      numberOfDays: 1,
      leaveStatus: this.requestStatus.Approved,
      leaveStructureId: this.leaveStructurelId,
      // leaveComponentId: this.selectedLeaveComponent.leaveComponentId,
      leaveComponentId: Number(unMarkedLeave.leaveComponentId)
    };

    this.employeeLeaveService.add(unMarkedLeave).subscribe(result => {
      this.toastr.showSuccessMessage('The Leave Status updated successfully');
      unMarkedLeave.leaveComponentId = 0;
      this.getAllUnMarkedLeaveDetailsByEmployeeId();
      this.getLeaveBalance();
      // this.activeModal.close("submit");
    },
      error => {
        console.error(error);
        this.toastr.showSuccessMessage('Unable to update the Leave Status');
      });
  }

  markAttendance(unMarkedLeave) {
    unMarkedLeave = {
      fromDate: unMarkedLeave.date,
      toDate: unMarkedLeave.date,
      employeeId: this.employeeId,
      // approvedBy: this.loginUserId,
      // approvedDate: new Date(),
      reason: 'Applied By HR',
      numberOfDays: 1,
      notifyPersonnel: '',
      isApproved: true,
      isFirstDayFirstHalf: false,
      isFirstDaySecondHalf: false,
      isFullDay: true,
      isSecondDayFirstHalf: false,
      isSecondDaySecondHalf: false,
    };
    this.preventSingleClick = false;
    const delay = 200;
    this.timer = setTimeout(() => {
       if (!this.preventSingleClick) {
        this.employeeOnDutyService.add(unMarkedLeave).subscribe(result => {
          this.toastr.showSuccessMessage('The Leave marked as On Duty Request successfully');
          this.getAllUnMarkedLeaveDetailsByEmployeeId();
          this.getLeaveBalance();
          // this.activeModal.close("submit");
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to mark the Leave Marked as On Duty Request');
          });
       }
     }, delay);

  }

}
