import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { HolidayService } from '../holiday.service';
import { Holiday } from '../holiday.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class HolidayEditComponent implements OnInit {
  editForm: FormGroup;
  currentUserId: number;
  minDate;
  maxDate;

  @Input() holiday: Holiday;
  @Input() year: any;
  @Input() isDisabled: boolean;
  @Input() holidayNames: string[];

  constructor(
    private holidayService: HolidayService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();

    this.editForm = this.createFormGroup();
    this.minDate = {
      year: this.year,
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: this.year,
      month: 12,
      day: 31
    };
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.holidayService.update(this.editForm.value).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Holiday already exists!');
      } else {
        this.toastr.showSuccessMessage('Holiday updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating holiday');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [this.holiday.name, [
        Validators.required,
        duplicateNameValidator(this.holidayNames)
      ]],
      description: [this.holiday.description, [Validators.required]],
      date: [{value: new Date(this.holiday.date), disabled: this.isDisabled}, [Validators.required]],
      isFloating: [{value: this.holiday.isFloating, disabled: this.isDisabled}],
      holidayCategoryId: [this.holiday.holidayCategoryId],
      id: [this.holiday.id],
      createdBy: [this.holiday.createdBy],
      createdDate: [this.holiday.createdDate],
      modifiedBy: [this.currentUserId]
    });
  }
}
