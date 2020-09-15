import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeContactDetailsService } from '../employee-contact-details.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-contact-details-edit',
  templateUrl: './employee-contact-details-edit.component.html'
})
export class EmployeeContactDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  @Input() contact;
  @Input() countries: any;
  @Input() states: any;
  currentUserId: number;
  public currentstatesByCountry: any;
  public permenentstatesByCountry: any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private contactService: EmployeeContactDetailsService,
    public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
    if (this.contact) {
      if (this.contact.workPhone && this.contact.workPhone.length) {
        this.contact.workPhoneCode = this.contact.workPhone.split('-')[0].substr(1);
        this.contact.workPhone = this.contact.workPhone.split('-')[1];
      }
      if (this.contact.mobile && this.contact.mobile.length) {
        this.contact.mobileCode = this.contact.mobile.split('-')[0].substr(1);
        this.contact.mobile = this.contact.mobile.split('-')[1];
      }
      if (this.contact.homePhone && this.contact.homePhone.length) {
        this.contact.homePhoneCode = this.contact.homePhone.split('-')[0].substr(1);
        this.contact.homePhone = this.contact.homePhone.split('-')[1];
      }
      if (this.contact.emergencyContactNumber && this.contact.emergencyContactNumber.length) {
        this.contact.emergencyContactCode = this.contact.emergencyContactNumber.split('-')[0].substr(1);
        this.contact.emergencyContactNumber = this.contact.emergencyContactNumber.split('-')[1];
      }

      this.editForm.patchValue(this.contact);
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      workEmail: [{ value: null, disabled: true }, [
        Validators.email
      ]],
      personalEmail: [null, [
        Validators.email,
        Validators.required
      ]],
      mobile: [null, [
        Validators.required
      ]],
      mobileCode: [null, [
        Validators.required
      ]],
      workPhone: [null],
      workPhoneCode: [null],
      homePhone: [null],
      homePhoneCode: [null],
      skype: [null],
      emergencyContactName: [null, [

      ]],
      emergencyContactNumber: [null, [

      ]],
      emergencyContactCode: [null],
      createdBy: [this.currentUserId],
      createdDate: [],
      modifiedBy: [this.currentUserId]

    });

  }

  onSubmit() {
    const updateContactForm = this.editForm.getRawValue();
    updateContactForm.employeeId = this.currentUserId;
    if (this.contact) {
      updateContactForm.id = this.contact.id;

    }

    if (updateContactForm.workPhoneCode && updateContactForm.workPhone) {
      updateContactForm.workPhone = `+${updateContactForm.workPhoneCode}-${updateContactForm.workPhone}`;
    } else {
      updateContactForm.workPhone = '';
    }

    if (updateContactForm.mobileCode && updateContactForm.mobile) {
      updateContactForm.mobile = `+${updateContactForm.mobileCode}-${updateContactForm.mobile}`;
    } else {
      updateContactForm.mobile = '';
    }

    if (updateContactForm.homePhoneCode && updateContactForm.homePhone) {
      updateContactForm.homePhone = `+${updateContactForm.homePhoneCode}-${updateContactForm.homePhone}`;
    } else {
      updateContactForm.homePhone = '';
    }

    if (updateContactForm.emergencyContactCode && updateContactForm.emergencyContactNumber) {
      updateContactForm.emergencyContactNumber = `+${updateContactForm.emergencyContactCode}-${updateContactForm.emergencyContactNumber}`;
    } else {
      updateContactForm.emergencyContactNumber = '';
    }

    this.contactService.update(updateContactForm).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('The contact updated successfully');
        this.activeModal.close('submit');
      }
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to update the contact');
    });
  }


}
