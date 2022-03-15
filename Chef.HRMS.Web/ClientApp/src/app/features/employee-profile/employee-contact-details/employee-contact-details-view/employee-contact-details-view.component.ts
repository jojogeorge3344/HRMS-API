import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeContactDetailsService } from '../employee-contact-details.service';
import { EmployeeContactDetailsEditComponent } from '../employee-contact-details-edit/employee-contact-details-edit.component';
import { EmployeeContactDetails } from '../employee-contact-details.model';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { forkJoin } from 'rxjs';
import { EmployeeBasicDetailsService } from '@features/employee/employee-basic-details/employee-basic-details.service';

@Component({
  selector: 'hrms-employee-contact-details-view',
  templateUrl: './employee-contact-details-view.component.html'
})
export class EmployeeContactDetailsViewComponent implements OnInit, OnDestroy {

  public countries: any;
  public states: any;
  contact: EmployeeContactDetails;
  userId: number;

  constructor(private contactService: EmployeeContactDetailsService,
    private basicdetailsService: EmployeeBasicDetailsService,
    public modalService: NgbModal) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.userId = getCurrentUserId();
    this.getcontacts();
  }

  getcontacts() {
    forkJoin([this.contactService.getAll(this.userId), this.basicdetailsService.get(this.userId)])
      .subscribe(([contacts, details]) => {
        if (contacts.length) {
          this.contact = contacts[0];
          this.contact.workEmail = details.email;
        }
      });
  }

  openEdit() {
    const modalRef = this.modalService.open(EmployeeContactDetailsEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.employeeId = this.userId;
    modalRef.componentInstance.id = this.contact ? this.contact.id : 0;
    modalRef.componentInstance.countries = this.countries;
    modalRef.componentInstance.states = this.states;
    modalRef.componentInstance.contact = this.contact;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getcontacts();
      }
      else {
        this.contact.mobile = `+${this.contact.mobileCode}-${this.contact.mobile}`
        this.contact.workPhone = `+${this.contact.workPhoneCode}-${this.contact.workPhone}`
        this.contact.homePhone = `+${this.contact.homePhoneCode}-${this.contact.homePhone}`
        this.contact.emergencyContactNumber = `+${this.contact.emergencyContactCode}-${this.contact.emergencyContactNumber}`
      }
    }, error => {
      this.contact.mobile = `+${this.contact.mobileCode}-${this.contact.mobile}`
      this.contact.workPhone = `+${this.contact.workPhoneCode}-${this.contact.workPhone}`
      this.contact.homePhone = `+${this.contact.homePhoneCode}-${this.contact.homePhone}`
      this.contact.emergencyContactNumber = `+${this.contact.emergencyContactCode}-${this.contact.emergencyContactNumber}`
      console.log(error)
    });
  }
}
