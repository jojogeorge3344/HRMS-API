import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeJobFilingService } from '../employee-job-filing.service';
import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { ExpensePolicyService } from '@settings/expense/expense-policy/expense-policy.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { PayrollStructureService } from '@settings/payroll/payroll-structure/payroll-structure.service';
import { OvertimePolicyService } from '@settings/overtime/overtime-policy/overtime-policy.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { ActivatedRoute } from '@angular/router';
import { WeekOff } from '../../../../models/common/types/weekoff';
import { AttendanceTrackingType } from '../../../../models/common/types/attendancetrackingtype';
import { AttendanceCaptureSchemeType } from '../../../../models/common/types/attendancecaptureschemetype';
import { PayGroup } from '@settings/payroll/pay-group/pay-group.model';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { HolidayCategory } from '@settings/holiday/holiday-category.model';
import { ExpensePolicy } from '@settings/expense/expense-policy/expense-policy.model';
import { PayrollStructure } from '@settings/payroll/payroll-structure/payroll-structure.model';
import { OvertimePolicy } from '@settings/overtime/overtime-policy/overtime-policy.model';
import { LeaveStructure } from '@settings/leave/leave-structure/leave-structure.model';
import { Shift } from '@settings/attendance/shift/shift.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-filing-view',
  templateUrl: './employee-job-filing-view.component.html',
  styleUrls: ['./employee-job-filing-view.component.scss']
})
export class EmployeeJobFilingViewComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  id: any;
  jobFilingId: any;
  weekOff: object;
  attendanceTracking: object;
  expensePolicy: object;
  attendanceCaptureScheme: object;
  onBoardingFlow: object;
  holidayCategoryId: HolidayCategory[];
  expensePolicyId: ExpensePolicy[];
  shiftId: Shift[];
  payrollStructureId: PayrollStructure[];
  overTimePolicyId: OvertimePolicy[];
  payGroupId: PayGroup[];
  leaveStructureId: LeaveStructure[];
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  attendanceCaptureSchemeTypeKeys: number[];
  attendanceCaptureSchemeType = AttendanceCaptureSchemeType;
  paymentMode = PaymentMode;
  paymentModeKeys: number[];
  constructor(
    private employeeJobFilingService: EmployeeJobFilingService,
    private leaveStructureService: LeaveStructureService,
    private holidayCategoryService: HolidayCategoryService,
    private expensePolicyService: ExpensePolicyService,
    private shiftService: ShiftService,
    private payrollStructureService: PayrollStructureService,
    private overtimePolicyService: OvertimePolicyService,
    private payGroupService: PayGroupService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
  ) {
    this.paymentModeKeys = Object.keys(this.paymentMode).filter(Number).map(Number);
    this.editForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    this.attendanceCaptureSchemeTypeKeys = Object.keys(this.attendanceCaptureSchemeType).filter(Number).map(Number);
    this.route.params.subscribe((params: any) => {
      this.jobFilingId = params.jobFilingId;
      this.id = params.id;
    });
    this.getJobFilingID();
    this.getLeaveStructure();
    this.getHolidayList();
    this.getExpensePolicyList();
    this.getShiftList();
    this.getPayGroupList();
    this.getPayrollStructureList();
    this.getOverTimePolicyList();
  }

  getJobFilingID() {
    this.employeeJobFilingService.get(this.jobFilingId).subscribe(result => {
      this.editForm.patchValue(result);
    },
      error => {
        console.error(error);
      });
  }
  selectPayment(key) {
    this.editForm.patchValue({ paymentMode: key });
  }

  getLeaveStructure() {
    this.leaveStructureService.getConfiguredLeaveStructures().subscribe(result => {
      this.leaveStructureId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Leave Structures');
      });
  }

  getHolidayList() {
    this.holidayCategoryService.getAll().subscribe(result => {
      this.holidayCategoryId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holiday lists');
      });
  }

  getShiftList() {
    this.shiftService.getAll().subscribe(result => {
      this.shiftId = result;
      console.log('shift', this.shiftId);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the shift lists');
      });
  }

  getExpensePolicyList() {
    this.expensePolicyService.getAllConfiguredExpensePolicies().subscribe(result => {
      this.expensePolicyId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense policy lists');
      });
  }

  getPayGroupList() {
    this.payGroupService.getAll().subscribe(result => {
      this.payGroupId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the pay group lists');
      });
  }

  getPayrollStructureList() {
    this.payrollStructureService.getConfiguredPayrollStructures().subscribe(result => {
      this.payrollStructureId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll structure lists');
      });
  }

  getOverTimePolicyList() {
    this.overtimePolicyService.getConfiguredOvertimePolicies().subscribe(result => {
      this.overTimePolicyId = result;
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the over time policy lists');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [''],
      leaveStructureId: ['', [
        Validators.required
      ]],
      shiftId: ['', [
        Validators.required
      ]],
      weekOff: ['', [
        Validators.required
      ]],
      holidayCategoryId: ['', [
        Validators.required
      ]],
      attendanceTracking: ['', [
        Validators.required
      ]],
      expensePolicyId: [],
      attendanceCaptureScheme: ['', [
        Validators.required
      ]],
      payrollStructureId: ['', [
        Validators.required
      ]],
      overTimePolicyId: ['', [
        Validators.required
      ]],
      payGroupId: ['', [
        Validators.required
      ]],
      paymentMode: ['', [
        Validators.required
      ]],
      createdDate: []
    });
  }


}
