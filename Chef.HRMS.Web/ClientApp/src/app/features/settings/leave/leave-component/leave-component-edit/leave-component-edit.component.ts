import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LeaveComponentService } from '../leave-component.service';
import { LeaveComponent } from '../leave-component.model';
import { GenderType } from '../../../../../models/common/types/gendertype';
import { MaritalStatusType } from '../../../../../models/common/types/maritalstatustype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-leave-component-edit',
  templateUrl: './leave-component-edit.component.html'
})
export class LeaveComponentEditComponent implements OnInit {

  editForm: FormGroup;

  currentUserId: number;
  genderTypes = GenderType;
  maritalStatusTypes = MaritalStatusType;

  @Input() leaveComponent: LeaveComponent;
  @Input() isDisabled: boolean;
  @Input() leaveComponentNames: string[];
  @Input() leaveComponentCodes: string[];


  genderTypeKeys: number[];
  maritalStatusTypeKeys: number[];

  constructor(
    private leaveComponentService: LeaveComponentService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {

    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes).filter(Number).map(Number);

    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();

    this.toggleGender(this.leaveComponent.isRestrictedToGender);
    this.toggleMaritalStatus(this.leaveComponent.isRestrictedToMaritalStatus);

    this.editForm.patchValue(this.leaveComponent);
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
  }

  toggleGender(checked) {
    if (checked) {
      this.editForm.addControl('restrictedToGender', new FormControl({value: null, disabled: this.isDisabled}, Validators.required));
    } else {
      this.editForm.removeControl('restrictedToGender');
    }
  }

  toggleMaritalStatus(checked) {
    if (checked) {
      this.editForm.addControl('restrictedToMaritalStatus', new FormControl({value: null, disabled: this.isDisabled}, Validators.required));
    } else {
      this.editForm.removeControl('restrictedToMaritalStatus');
    }
  }

  get name() { return this.editForm.get('name'); }

  get code() { return this.editForm.get('code'); }

  onSubmit() {
    this.leaveComponentService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Leave component already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Leave component is updated successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the leave component');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.leaveComponentNames)
      ]],
      code: [null, [
        Validators.required,
        Validators.maxLength(3),
        Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.leaveComponentCodes)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(256)
      ]],
      showLeaveDescription: [{value: false, disabled: this.isDisabled}],
      isPaidLeave: [{value: false, disabled: this.isDisabled}],
      isSickLeave: [{value: false, disabled: this.isDisabled}],
      isStatutoryLeave: [{value: false, disabled: this.isDisabled}],
      isRestrictedToGender: [{value: false, disabled: this.isDisabled}],
      isRestrictedToMaritalStatus: [{value: false, disabled: this.isDisabled}],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId]
    });
  }
}

