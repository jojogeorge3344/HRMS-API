import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LeaveStructureService } from '@settings/leave/leave-structure/leave-structure.service';
import { HolidayCategoryService } from '@settings/holiday/holiday-category.service';
import { ExpensePolicyService } from '@settings/expense/expense-policy/expense-policy.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { WeekOff } from '../../../../models/common/types/weekoff';
import { AttendanceTrackingType } from '../../../../models/common/types/attendancetrackingtype';
import { AttendanceCaptureSchemeType } from '../../../../models/common/types/attendancecaptureschemetype';
import { HolidayCategory } from '@settings/holiday/holiday-category.model';
import { ExpensePolicy } from '@settings/expense/expense-policy/expense-policy.model';
import { Shift } from '@settings/attendance/shift/shift.model';
import { LeaveStructure } from '@settings/leave/leave-structure/leave-structure.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-filing-create',
  templateUrl: './employee-job-filing-create.component.html'
})
export class EmployeeJobFilingCreateComponent implements OnInit {

  addForm: FormGroup;
  weekOff: object;
  attendanceTracking: object;
  expensePolicy: object;
  attendanceCaptureScheme: object;
  onBoardingFlow: object;
  holidayList: HolidayCategory[];
  holidayCategoryId: HolidayCategory[];
  expensePolicyId: ExpensePolicy[];
  currentUserId: number;
  shiftId: Shift[];
  leaveStructureId: LeaveStructure[];
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  attendanceTrackingTypeKeys: number[];
  attendanceTrackingType = AttendanceTrackingType;
  attendanceCaptureSchemeTypeKeys: number[];
  attendanceCaptureSchemeType = AttendanceCaptureSchemeType;

  @Output() jobFilingsForm = new EventEmitter<boolean>();
  @Input() jobFilings: any;

  constructor(
    private leaveStructureService: LeaveStructureService,
    private holidayCategoryService: HolidayCategoryService,
    private shiftService: ShiftService,
    private expensePolicyService: ExpensePolicyService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.jobFilings != null) {
      this.addForm.patchValue(this.jobFilings);
    }
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
    this.attendanceTrackingTypeKeys = Object.keys(this.attendanceTrackingType).filter(Number).map(Number);
    this.attendanceCaptureSchemeTypeKeys = Object.keys(this.attendanceCaptureSchemeType).filter(Number).map(Number);
    this.getLeaveStructure();
    this.getHolidayList();
    this.getShiftList();
    this.getExpensePolicyList();
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

  onSubmit() {
    const addJobFilings = this.addForm.value;
    this.jobFilingsForm.emit(addJobFilings);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: '',
      leaveStructureId: ['', [
        Validators.required
      ]],
      shiftId: ['', [
        Validators.required
      ]],
      weekOff: [null, [
        Validators.required
      ]],
      holidayCategoryId: ['', [
        Validators.required
      ]],
      attendanceTracking: [null, [
        Validators.required
      ]],
      expensePolicyId: [0],

      attendanceCaptureScheme: [null, [
        Validators.required
      ]],
      createdBy: [this.currentUserId],
      createdDate: [new Date()],
      modifiedBy: [this.currentUserId]
    });
  }

}
