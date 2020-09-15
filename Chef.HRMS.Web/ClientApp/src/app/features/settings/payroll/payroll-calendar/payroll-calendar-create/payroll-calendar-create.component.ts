import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PayrollCalendarService } from '../payroll-calendar.service';
import { PayrollPeriodType } from '../../../../../models/common/types/payrollperiodtype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './payroll-calendar-create.component.html'
})
export class PayrollCalendarCreateComponent implements OnInit {
  addForm: FormGroup;
  currentUserId: number;
  startsFromLabels;
  processingDayLabels;
  periodTypeLabel = 'Month / Week';

  monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  weekDayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  monthDayLabels = Array.from({ length: 31 }, (x, i) => (i + 1) + this.nth(i + 1) + ' Day of the Month');
  weekLabels = Array.from({ length: 52 }, (x, i) => 'Week ' + (i + 1));

  @Input() payrollPeriodTypes: PayrollPeriodType;
  @Input() payrollPeriodTypeKeys: number;
  @Input() payrollCalendarNames: string[];

  constructor(
    private payrollCalendarService: PayrollCalendarService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  nth(n) {
    return [, 'st', 'nd', 'rd'][n % 100 >> 3 ^ 1 && n % 10] || 'th';
  }

  update(selectedPeriodType) {
    if (selectedPeriodType == this.payrollPeriodTypes['Weekly']) {
      this.startsFromLabels = this.weekLabels;
      this.processingDayLabels = this.weekDayLabels;
      this.periodTypeLabel = 'Week';
    } else if (selectedPeriodType == this.payrollPeriodTypes['Monthly']) {
      this.startsFromLabels = this.monthLabels;
      this.processingDayLabels = this.monthDayLabels;
      this.periodTypeLabel = 'Month';
    }

    this.addForm.patchValue({
      startsFrom: null,
      processingDay: null
    });

    this.addForm.get('startsFrom').markAsPristine();
    this.addForm.get('processingDay').markAsPristine();
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.payrollCalendarService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Payroll calendar already exists!');
      } else {
        this.toastr.showSuccessMessage('Payroll calendar added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the payroll calendar ');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.payrollCalendarNames)
      ]],
      periodType: [null, [
        Validators.required
      ]],
      startsFrom: [null, [
        Validators.required
      ]],
      processingDay: [null, [
        Validators.required,
      ]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
}

