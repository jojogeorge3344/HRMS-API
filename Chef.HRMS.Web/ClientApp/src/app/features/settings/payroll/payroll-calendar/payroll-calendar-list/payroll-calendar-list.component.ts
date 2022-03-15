import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollCalendarService } from '../payroll-calendar.service';
import { PayrollCalendarCreateComponent } from '../payroll-calendar-create/payroll-calendar-create.component';
import { PayrollCalendarEditComponent } from '../payroll-calendar-edit/payroll-calendar-edit.component';
import { PayrollPeriodType } from '../../../../../models/common/types/payrollperiodtype';
import { PayrollCalendar } from '../payroll-calendar.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './payroll-calendar-list.component.html'
})
export class PayrollCalendarListComponent implements OnInit {
  public payrollCalendars: PayrollCalendar[];
  assignedPayrollCalendars: number[] = [];

  payrollPeriodTypes = PayrollPeriodType;
  payrollPeriodTypeKeys: number[];

  payrollCalendarNames: string[];

  monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekDayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthDayLabels = Array.from({ length: 31 }, (x, i) => (i + 1) + this.nth(i + 1) + ' Day of the Month');
  weekLabels = Array.from({ length: 52 }, (x, i) => 'Week ' + (i + 1));

  constructor(
    private payrollCalendarService: PayrollCalendarService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
    this.payrollPeriodTypeKeys = Object.keys(this.payrollPeriodTypes).filter(Number).map(Number);
  }

  ngOnInit(): void {
    this.getPayrollCalendars();
    this.getAssignedPayrollCalendars();
  }

  nth(n) {
    return [, 'st', 'nd', 'rd'][n % 100 >> 3 ^ 1 && n % 10] || 'th';
  }

  getPayrollCalendars() {
    this.payrollCalendarService.getAll().subscribe((result: PayrollCalendar[]) => {
      this.payrollCalendars = result;
      this.payrollCalendarNames = this.payrollCalendars.map(a => a.name.toLowerCase());
      console.log(result);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the payroll calendars');
      });
  }

  getAssignedPayrollCalendars() {
    this.payrollCalendarService.getAllAssignedPayrollCalendars().subscribe(res => {
      this.assignedPayrollCalendars = res;
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(payrollCalendar) {
    return this.assignedPayrollCalendars.includes(payrollCalendar.id);
  }

  openCreate() {
    const modalRef = this.modalService.open(PayrollCalendarCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.payrollPeriodTypes = this.payrollPeriodTypes;
    modalRef.componentInstance.payrollPeriodTypeKeys = this.payrollPeriodTypeKeys;
    modalRef.componentInstance.payrollCalendarNames = this.payrollCalendarNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayrollCalendars();
      }
    });
  }

  openEdit(payrollCalendar: PayrollCalendar) {
    const modalRef = this.modalService.open(PayrollCalendarEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.payrollCalendar = payrollCalendar;
    modalRef.componentInstance.payrollPeriodTypes = this.payrollPeriodTypes;
    modalRef.componentInstance.payrollPeriodTypeKeys = this.payrollPeriodTypeKeys;
    modalRef.componentInstance.isDisabled = this.isDisabled(payrollCalendar);
    modalRef.componentInstance.payrollCalendarNames = this.payrollCalendarNames.filter(v => v !== payrollCalendar.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayrollCalendars();
      }
    });
  }

  delete(payrollCalendar: PayrollCalendar) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the payroll calendar ${payrollCalendar.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payrollCalendarService.delete(payrollCalendar.id).subscribe(() => {
          this.toastr.showSuccessMessage('The payroll calendar is deleted successfully!');
          this.getPayrollCalendars();
        });
      }
    });
  }

}
