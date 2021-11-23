import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { EmployeeDefaultsService } from '../employee-defaults.service';
import { WorkerType } from '../../../../../models/common/types/workertype';
import { TimeType } from '../../../../../models/common/types/timetype';
import { PeriodType } from '../../../../../models/common/types/periodType';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-defaults-edit',
  templateUrl: './employee-defaults-edit.component.html'
})
export class EmployeeDefaultsEditComponent implements OnInit {


  editForm: FormGroup;
  currentUserId: number;
  workerTypeKeys: number[];
  workerType = WorkerType;
  timeTypeKeys: number[];
  timeType = TimeType;
  periodTypeKeys: number[];
  periodType = PeriodType;
  employeeDefaults: any;

  constructor(
    private employeeDefaultsService: EmployeeDefaultsService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
 }

  ngOnInit(): void {
    this.getEmployeeDefaultList();

    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();

    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.periodTypeKeys = Object.keys(this.periodType).filter(Number).map(Number);
    this.onChanges();
  }

  getEmployeeDefaultList() {
    this.employeeDefaultsService.getAll().subscribe(result => {
      this.employeeDefaults = result[0];
      this.editForm.patchValue(this.employeeDefaults);
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Employee Defaults Details');
    });
  }

  onChanges(): void {
    this.editForm.get('periodType').valueChanges.subscribe(value => {
      this.setMaxValidation(value);
    });
  }

  setMaxValidation(periodType) {
    const probationDurationControl =  this.editForm.get('probationDuration') as FormControl;

    switch (periodType) {
      case this.periodType.Days: {
        probationDurationControl.setValidators([Validators.max(365)]);
        break;
      }
      case this.periodType.Weeks: {
        probationDurationControl.setValidators([Validators.max(52)]);
        break;
      }
      case this.periodType.Months: {
        probationDurationControl.setValidators([Validators.max(50)]);
        break;
      }
      default:
        break;
    }
    probationDurationControl.updateValueAndValidity();
  }

  onSubmit() {
    let editEmployeeDefault = this.editForm.value;
    this.employeeDefaultsService.update(this.editForm.value).subscribe(result => {
      this.toastr.showSuccessMessage('The Employee Default Details is updated successfully!');
      // this.activeModal.close("submit");
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('There is an error in updating Employee Default Details');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      probationDuration: ['', [
        Validators.required,
        Validators.min(0)
      ]],
      periodType: [1, [
        Validators.required
      ]],
      workerType: [1, [
        Validators.required
      ]],
      timeType: [1, [
        Validators.required
      ]],
      createdDate: []
    });
  }

}
