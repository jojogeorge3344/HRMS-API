import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { LeaveStructureService } from '../leave-structure.service';
import { LeaveStructure } from '../leave-structure.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-leave-structure-edit',
  templateUrl: './leave-structure-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class LeaveStructureEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  minDate;

  @Input() leaveStructure: LeaveStructure;
  @Input() isDisabled: boolean;
  @Input() leaveStructureNames: string[];

  constructor(
    private leaveStructureService: LeaveStructureService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    const createdDate = new Date(this.leaveStructure.createdDate);
    this.minDate = {
      year: createdDate.getFullYear(),
      month: createdDate.getMonth() + 1,
      day: createdDate.getDate()
    };
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.editForm.value.createdDate = this.leaveStructure.createdDate;
    this.leaveStructureService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Leave Structure already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Leave Structure is updated successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the Leave Structure');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.leaveStructure.id],
      name: [this.leaveStructure.name, [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.leaveStructureNames)
      ]],
      description: [this.leaveStructure.description, [
        Validators.required,
        Validators.maxLength(256),
      ]],
      calendarYearStartDate: [{ value: new Date(this.leaveStructure.calendarYearStartDate), disabled: this.isDisabled }, [
        Validators.required,
      ]],
      showLeavePolicyExplanation: { value: this.leaveStructure.showLeavePolicyExplanation, disabled: this.isDisabled },
      isCustomLeavePolicyDocumentAvailable: { value: this.leaveStructure.isCustomLeavePolicyDocumentAvailable, disabled: this.isDisabled },
      customDocumentPath: { value: this.leaveStructure.customDocumentPath, disabled: this.isDisabled },
      createdBy: [this.leaveStructure.createdBy],
      createdDate: [this.leaveStructure.createdDate],
      modifiedBy: [this.currentUserId]
    });
  }
}
