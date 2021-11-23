import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NgbActiveModal, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

import { ShiftService } from '../shift.service';
import { Shift } from '../shift.model';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-shift-create',
  templateUrl: './shift-create.component.html'
})
export class ShiftCreateComponent implements OnInit {

  addForm: FormGroup;
  fromTime: NgbTimeStruct;
  toTime: NgbTimeStruct;
  currentUserId: number;

  startDate: Date;
  endDate: Date;

  @Input() shiftNames: string[];

  constructor(
    private shiftService: ShiftService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {

    this.fromTime = { hour: 9, minute: 0, second: 0 };
    this.toTime = { hour: 18, minute: 0, second: 0 };

    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();

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

      this.addForm.patchValue({ startTime: this.startDate.toISOString(), endTime: this.endDate.toISOString() });
    } else {
      this.addForm.patchValue({ startTime: null, endTime: null });
    }
  }

  onSubmit() {
    this.shiftService.add(this.addForm.value).subscribe((result: Shift) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Shift name already exists!');
      } else {
        this.toastr.showSuccessMessage('Shift added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add shift');
      });
  }

  get name() { return this.addForm.get('name'); }

  get startTime() { return this.addForm.get('startTime'); }

  get endTime() { return this.addForm.get('endTime'); }

  private createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(26),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.shiftNames)
      ]],
      startTime: [null, [
        Validators.required
      ]],
      endTime: [null, [
        Validators.required
      ]],
      breakDuration: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(60)
      ]],
      numberOfDays: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(7)
      ]],
      comments: [null, [
        Validators.maxLength(256)
      ]],
    }, { validators: durationValidator });
  }
}

const durationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const startTime = control.get('startTime');
  const endTime = control.get('endTime');

  const duration = (new Date(endTime.value).getTime() - new Date(startTime.value).getTime()) / 3600000;

  return (duration > 16 || duration < 5) ? { duration: true } : null;
};



