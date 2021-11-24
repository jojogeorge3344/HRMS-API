import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { WorkFromHomeSettingsService } from '../work-from-home-settings.service';
import { WorkFromHomeSettings } from '../work-from-home-settings.model';
import { WorkFromHomePeriodType } from 'src/app/models/common/types/workfromhomeperiodtype';
import { Router, ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-work-from-home-settings-create',
  templateUrl: './work-from-home-settings-create.component.html'
})
export class WorkFromHomeSettingsCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: number[];

  constructor(
    private workFromHomeSettingsService: WorkFromHomeSettingsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService) {
    this.periodTypeKeys = Object.keys(this.periodTypes).filter(Number).map(Number);
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.onChanges();
  }

  onChanges(): void {
    this.addForm.get('isEnabled').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('isLimited').enable();
      } else {
        this.addForm.get('isLimited').disable();
        this.addForm.patchValue({ isLimited: false });
      }
    });

    this.addForm.get('isLimited').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('maximumLimit').enable();
        this.addForm.get('periodType').enable();
      } else {
        this.addForm.get('maximumLimit').disable();
        this.addForm.get('periodType').disable();
        this.addForm.patchValue({ maximumLimit: null, periodType: null });
      }
    });

    this.addForm.get('periodType').valueChanges.subscribe(value => {
      this.setMaxValidation(value);
    });
  }

  setMaxValidation(periodType) {
    const maximumLimitControl = this.addForm.get('maximumLimit') as FormControl;

    switch (periodType) {
      case this.periodTypes.Week: {
        maximumLimitControl.setValidators([Validators.max(7)]);
        break;
      }
      case this.periodTypes.Month: {
        maximumLimitControl.setValidators([Validators.max(30)]);
        break;
      }
      case this.periodTypes.Year: {
        maximumLimitControl.setValidators([Validators.max(365)]);
        break;
      }
      default:
        break;
    }
    maximumLimitControl.updateValueAndValidity();
  }

  onSubmit() {
    this.workFromHomeSettingsService.add(this.addForm.value).subscribe((result: WorkFromHomeSettings) => {
      if (result.id !== -1) {
        this.toastr.showSuccessMessage('The work from home settings is added successfully!');
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in adding work from home settings');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      approvalWorkflowId: [1],
      isEnabled: [false],
      isLimited: [{ value: false, disabled: true }],
      maximumLimit: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1)
      ]],
      periodType: [{ value: null, disabled: true }, [
        Validators.required
      ]],
      });
  }
}
