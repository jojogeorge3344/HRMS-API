import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { GenderType } from '../../../../models/common/types/gendertype';
import { BloodGroupType } from '../../../../models/common/types/bloodgrouptype';
import { MaritalStatusType } from '../../../../models/common/types/maritalstatustype';
import { EmployeeBasicDetailsService } from '@features/employee/employee-basic-details/employee-basic-details.service';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-primary-details-edit',
  templateUrl: './employee-primary-details-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeePrimaryDetailsEditComponent implements OnInit {

  editForm: FormGroup;
  @Input() primaryDetails;
  @Input() currentUserId;
  genderTypes = GenderType;
  genderTypeKeys: number[];
  bloodGroupType = BloodGroupType;
  bloodGroupTypeKeys: number[];
  maritalStatusType = MaritalStatusType;
  maritalStatusTypeKeys: number[];
  maxDate;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private basicdetailsService: EmployeeBasicDetailsService,
    public activeModal: NgbActiveModal) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    if (this.primaryDetails) {
      this.primaryDetails.dateOfBirth = new Date(this.primaryDetails.dateOfBirth);
    }
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.bloodGroupTypeKeys = Object.keys(this.bloodGroupType).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusType).filter(Number).map(Number);
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.primaryDetails);
    // this.primaryDetails.patchValue({ modifiedBy: this.currentUserId });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      firstName: ['',[ Validators.required,Validators.maxLength(32)]],
      middleName: ['',[Validators.required,Validators.maxLength(32)]],
      lastName: ['', [Validators.required,Validators.maxLength(32)]],
      displayName: ['', [Validators.required,Validators.maxLength(32)]],
      gender: ['', [Validators.required]],
      dateOfBirth: [new Date(), Validators.required],
      bloodGroup: [null],
      maritalStatus: [null],
      email: ['',[Validators.required]],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId]
    });
  }
  onSubmit() {
    const primaryDetailsObj = this.editForm.value;
    primaryDetailsObj.id = this.currentUserId;
    this.basicdetailsService.update(primaryDetailsObj).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('The primary details updated successfully');
        this.activeModal.close('submit');
      }
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to update the primary');
    });
  }

}
