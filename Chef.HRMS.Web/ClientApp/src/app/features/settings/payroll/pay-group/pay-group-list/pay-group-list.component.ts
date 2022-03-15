import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { PayGroupCreateComponent } from '../pay-group-create/pay-group-create.component';
import { PayGroupEditComponent } from '../pay-group-edit/pay-group-edit.component';

import { PayGroupService } from '../pay-group.service';
import { PayrollCalendarService } from '../../payroll-calendar/payroll-calendar.service';
import { PayGroup } from '../pay-group.model';
import { PayrollCalendar } from '../../payroll-calendar/payroll-calendar.model';
import { Months } from './../../../../../models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-pay-group-list',
  templateUrl: './pay-group-list.component.html'
})
export class PayGroupListComponent implements OnInit, OnDestroy {

  payGroups: PayGroup[];
  assignedPayGroups: number[] = [];
  payGroupNames: string[];
  payGroupCodes: string[];

  months = Months;

  calenders: PayrollCalendar[] = [];
  constructor(
    private payGroupService: PayGroupService,
    private payrollCalendarService: PayrollCalendarService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) { }

  ngOnDestroy(): void {
   this.modalService.dismissAll()
  }


  ngOnInit(): void {
    this.getCalendars();
    this.getPayGroups();
    this.getAssignedPayGroups();
  }
  getCalendars() {
    this.payrollCalendarService.getAll()
      .subscribe(res => {
        this.calenders = res;
      });
  }

  getAssignedPayGroups() {
    this.payGroupService.getAllAssignedPayGroups().subscribe(res => {
      this.assignedPayGroups = res;
    },
    error => {
      console.error(error);
    });
  }

  isDisabled(payGroup) {
    return this.assignedPayGroups.includes(payGroup.id);
  }

  getPayGroups() {

    this.payGroupService.getAll()
      .subscribe(res => {
        this.payGroups = res;
        this.payGroupNames = this.payGroups.map(a => a.name.toLowerCase());
        this.payGroupCodes = this.payGroups.map(a => a.code.toLowerCase());
      });
  }
  getCalendar(calendarId) {
    if (this.calenders.length) {
      return this.calenders.find(calendar => calendar.id == calendarId).name;
    }
    return '';
  }

  openAdd() {
    const modalRef = this.modalService.open(PayGroupCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.calenders = this.calenders;
    modalRef.componentInstance.payGroupNames = this.payGroupNames;
    modalRef.componentInstance.payGroupCodes = this.payGroupCodes;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayGroups();
      }
    }, error => {
      console.log(error);
    });

  }
  openEditPayGroup(payGroup: PayGroup) {
    const modalRef = this.modalService.open(PayGroupEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.calenders = this.calenders;
    modalRef.componentInstance.payGroup = payGroup;
    modalRef.componentInstance.isDisabled = this.isDisabled(payGroup);
    modalRef.componentInstance.payGroupNames = this.payGroupNames.filter(v => v !== payGroup.name.toLowerCase());
    modalRef.componentInstance.payGroupCodes = this.payGroupCodes.filter(v => v !== payGroup.code.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getPayGroups();
      }
    }, error => {
      console.log(error);
    });
  }

  deletePayGroup(payGroup: PayGroup) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the payGroup ${payGroup.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.payGroupService.delete(payGroup.id).subscribe(() => {
          this.toastr.showSuccessMessage('The pay group is deleted successfully!');
          this.getPayGroups();
        });
      }
    });
  }

}
