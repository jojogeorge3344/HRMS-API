import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { WorkFromHomeSettingsService } from '../work-from-home-settings.service';
import { WorkFromHomeSettings } from '../work-from-home-settings.model';
import { WorkFromHomePeriodType } from 'src/app/models/common/types/workfromhomeperiodtype';
import { Router, ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-work-from-home-settings-edit',
  templateUrl: './work-from-home-settings-edit.component.html'
})
export class WorkFromHomeSettingsEditComponent implements OnInit {

  editForm: FormGroup;
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
    this.editForm = this.createFormGroup();
    this.onChanges();
    this.getWorkFromHomeSettings();
  }

  onChanges(): void {
    this.editForm.get('isEnabled').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('isLimited').enable();
      } else {
        this.editForm.get('isLimited').disable();
        this.editForm.patchValue({ isLimited: false });
      }
    });

    this.editForm.get('isLimited').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('maximumLimit').enable();
        this.editForm.get('periodType').enable();
      } else {
        this.editForm.get('maximumLimit').disable();
        this.editForm.get('periodType').disable();
        this.editForm.patchValue({ maximumLimit: '', periodType: null });
      }
    });

    this.editForm.get('periodType').valueChanges.subscribe(value => {
      this.setMaxValidation(value);
    });
  }

  getWorkFromHomeSettings() {
    this.workFromHomeSettingsService.get().subscribe((result: WorkFromHomeSettings) => {
      this.editForm.patchValue(result);
      this.editForm.patchValue({ modifiedBy: this.currentUserId });
      if (!result.isLimited) {
        this.editForm.patchValue({ maximumLimit: '', periodType: null });
      }
    });
  }

  setMaxValidation(periodType) {
    const maximumLimitControl = this.editForm.get('maximumLimit') as FormControl;

    switch (periodType) {
      case this.periodTypes.Week: {
        maximumLimitControl.setValidators([Validators.max(7), Validators.required, Validators.min(1)]);
        break;
      }
      case this.periodTypes.Month: {
        maximumLimitControl.setValidators([Validators.max(30), Validators.required, Validators.min(1)]);
        break;
      }
      case this.periodTypes.Year: {
        maximumLimitControl.setValidators([Validators.max(365), Validators.required, Validators.min(1)]);
        break;
      }
      default:
        break;
    }
    maximumLimitControl.updateValueAndValidity();
  }

  onSubmit() {
    this.workFromHomeSettingsService.update(this.editForm.value).subscribe((result: number) => {
      if (result === 1) {
        this.toastr.showSuccessMessage('The work from home settings is updated successfully!');
        this.router.navigate(['./'], { relativeTo: this.route.parent });
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating work from home settings');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      approvalWorkflowId: [1],
      isEnabled: [false],
      isLimited: [{ value: false, disabled: true }],
      maximumLimit: [{ value: '', disabled: true }, [
        Validators.required,
        Validators.min(1)
      ]],
      periodType: [{ value: null, disabled: true }, [
        Validators.required
      ]],
      priorDays: [0, [Validators.max(31), Validators.min(1)]],
      subsequentDays: [0, [Validators.max(31), Validators.min(1)]],
      // createdBy: [],
      createdDate: [],
      // modifiedBy: [this.currentUserId]
    });
  }
}
