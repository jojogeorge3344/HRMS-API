import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDatepicker, NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

import { LeaveBalanceValidator, calculateDaysInBetween, getCurrentUserId } from '@shared/utils/utils.functions';
import { LeaveComponent } from '@settings/leave/leave-component/leave-component.model';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { SignalrService } from '@shared/services/signalr.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeLeaveService } from '@features/employee-leave/employee-leave.service';

@Component({
  selector: 'hrms-leave-request-view',
  templateUrl: './leave-request-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class LeaveRequestViewComponent implements OnInit {

  addForm: FormGroup;

  @Input() notification: any;
  @Input() leaveComponents: any = [];

  fromDate: Date;
  toDate: Date;
  numberOfDays = 0;
  isSingleDay: boolean;
  selectedButton: any;
  selectedLeaveComponent: any;
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  currentDate;
  markDisabled;
  isValid = true;

  employeeList: Employee[];
  selectedItems = [];
  employeeDetails: Employee;
  taken = ['', ''];
  currentUserId: number;


  constructor(
    private employeeLeaveService: EmployeeLeaveService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      ...this.notification,
      fromDate: new Date(this.notification.fromDate),
      toDate: new Date(this.notification.toDate),
      singleDay: this.getSingleDay(this.notification),
      firstDay: this.getFirstDay(this.notification),
      lastDay: this.getLastDay(this.notification)
    });
  }
  getLastDay(notification: any): any {
    if (notification.isSecondDayFirstHalf) {
      return 1;
    } else if (notification.isSecondDaySecondHalf) {
      return 2;
    }
  }
  getFirstDay(notification: any): any {
    if (notification.isFirstDayFirstHalf) {
      return 1;
    } else if (notification.isFirstDaySecondHalf) {
      return 2;
    }

  }
  getSingleDay(notification: any): any {
    if (notification.isFullDay) {
      return 1;
    } else if (notification.isFirstDayFirstHalf) {
      return 2;
    } else if (notification.isFirstDaySecondHalf) {
      return 3;
    }
  }


  onSubmit() {
    let addForm = this.addForm.getRawValue();
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      leaveStatus: 3,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.employeeLeaveService.update(addForm).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Leave Request submitted successfully');
        this.activeModal.close('submit');
      }
    });
  }
  reject() {
    let addForm = this.addForm.getRawValue();
    addForm.numberOfDays = this.numberOfDays;
    addForm = {
      ...addForm,
      leaveStatus: 5,
      approvedBy: this.currentUserId,
      approvedDate: new Date(Date.now()),
      modifiedBy: this.currentUserId,
      modifiedDate: new Date(Date.now())
    };
    this.employeeLeaveService.update(addForm).subscribe((result) => {
      if (result) {
        this.toastr.showSuccessMessage('Leave Request rejected successfully');
        this.activeModal.close('submit');
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      leaveComponentId: [{ value: null, disabled: true }, [
        Validators.required
      ]],
      leaveStructureId: [],
      employeeId: ['', [
        Validators.required
      ]],
      // approvedBy: [1],
      // approvedDate: [new Date(Date.now())],
      description: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.maxLength(128),
      ]],
      fromDate: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      toDate: [{ value: '', disabled: true }, [
        Validators.required
      ]],
      numberOfDays: [''],
      leaveStatus: [2, [
        Validators.required
      ]],
      singleDay: [1],
      firstDay: [1],
      lastDay: [2],
      isFullDay: [false],
      isFirstDayFirstHalf: [false],
      isFirstDaySecondHalf: [false],
      isSecondDayFirstHalf: [false],
      isSecondDaySecondHalf: [false],
      createdBy: [],
      modifiedBy: []
    });
  }

}
