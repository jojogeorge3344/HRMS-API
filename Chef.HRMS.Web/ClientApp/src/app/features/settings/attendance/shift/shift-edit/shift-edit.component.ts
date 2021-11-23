import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { ShiftService } from '../shift.service';
import { Shift } from '../shift.model';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-shift-edit',
  templateUrl: './shift-edit.component.html'
})
export class ShiftEditComponent implements OnInit {

  editForm: FormGroup;
  fromTime: NgbTimeStruct;
  toTime: NgbTimeStruct;
  currentUserId: number;

  startDate: Date;
  endDate: Date;

  @Input() shiftNames: string[];
  @Input() shift: Shift;
  @Input() isDisabled: boolean;

  constructor(
    private shiftService: ShiftService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.fromTime = {
      hour: new Date(this.shift.startTime).getHours(),
      minute: new Date(this.shift.startTime).getMinutes(),
      second: 0
    };
    this.toTime = {
      hour: new Date(this.shift.endTime).getHours(),
      minute: new Date(this.shift.endTime).getMinutes(),
      second: 0
    };

    this.currentUserId = getCurrentUserId();

    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.shift);
    this.setTime();
  }

  setTime() {
    if (this.fromTime && this.toTime) {
      const currentDate = new Date();
      this.startDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.fromTime.hour, this.fromTime.minute));
      this.endDate = new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), this.toTime.hour, this.toTime.minute));

      if (this.startDate > this.endDate) {
        this.endDate.setDate(this.endDate.getDate() + 1);
      }

      this.editForm.patchValue({ startTime: this.startDate.toISOString(), endTime: this.endDate.toISOString() });
    } else {
      this.editForm.patchValue({ startTime: null, endTime: null });
    }
  }

  onSubmit() {
    this.shiftService.update(this.editForm.getRawValue()).subscribe((result: number) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Shift name already exists!');
      } else {
        this.toastr.showSuccessMessage('Shift updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update shift');
      });
  }

  get name() { return this.editForm.get('name'); }

  get startTime() { return this.editForm.get('startTime'); }

  get endTime() { return this.editForm.get('endTime'); }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: [null, [
        Validators.required,
        Validators.maxLength(26),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.shiftNames)
      ]],
      startTime: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      endTime: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      breakDuration: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]],
      numberOfDays: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]],
      comments: [null, [
        Validators.maxLength(256)
      ]],
      createdDate: [],
    }, { validators: durationValidator });
  }
}

const durationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');

  const duration = (new Date(endTime.value).getTime() - new Date(startTime.value).getTime()) / 3600000;

  return (duration > 16 || duration < 5) ? { duration: true } : null;
};
