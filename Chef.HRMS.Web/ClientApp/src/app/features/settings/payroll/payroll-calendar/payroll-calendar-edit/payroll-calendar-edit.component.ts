import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PayrollCalendarService } from '../payroll-calendar.service';
import { PayrollPeriodType } from '../../../../../models/common/types/payrollperiodtype';
import { PayrollCalendar } from '../payroll-calendar.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './payroll-calendar-edit.component.html'
})
export class PayrollCalendarEditComponent implements OnInit {
  editForm: FormGroup;
  currentUserId: number;
  startsFromLabels;
  processingDayLabels;
  periodTypeLabel = 'Month / Week';

  monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekDayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthDayLabels = Array.from({ length: 31 }, (x, i) => (i + 1) + this.nth(i + 1) + ' Day of the Month');
  weekLabels = Array.from({ length: 52 }, (x, i) => 'Week ' + (i + 1));

  @Input() payrollPeriodTypeKeys: number;
  @Input() payrollPeriodTypes: PayrollPeriodType;
  @Input() payrollCalendar: PayrollCalendar;
  @Input() isDisabled: boolean;
  @Input() payrollCalendarNames: string[];



  constructor(
    private payrollCalendarService: PayrollCalendarService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.payrollCalendar);
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
    this.update(this.payrollCalendar.periodType, false);
  }

  nth(n) {
    return [, 'st', 'nd', 'rd'][n % 100 >> 3 ^ 1 && n % 10] || 'th';
  }

  update(selectedPeriodType, isUpdate) {
    if (isUpdate) {
      this.editForm.patchValue({
        startsFrom: null,
        processingDay: null
      });
    }

    if (selectedPeriodType == this.payrollPeriodTypes['Weekly']) {
      this.startsFromLabels = this.weekLabels;
      this.processingDayLabels = this.weekDayLabels;
      this.periodTypeLabel = 'Week';
    } else if (selectedPeriodType == this.payrollPeriodTypes['Monthly']) {
      this.startsFromLabels = this.monthLabels;
      this.processingDayLabels = this.monthDayLabels;
      this.periodTypeLabel = 'Month';
    }
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.payrollCalendarService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Payroll calendar already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll calendar updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to update the payroll calendar ');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollCalendarNames)
      ]],
      periodType: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      startsFrom: [{ value: null, disabled: this.isDisabled }, [
        Validators.required
      ]],
      processingDay: [{ value: null, disabled: this.isDisabled }, [
        Validators.required,
      ]],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId]
    });
  }
}
