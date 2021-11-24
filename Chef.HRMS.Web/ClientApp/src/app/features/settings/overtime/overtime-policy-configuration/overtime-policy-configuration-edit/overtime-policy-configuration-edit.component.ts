import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OvertimePolicy } from '../../overtime-policy/overtime-policy.model';
import { OvertimePolicyService } from '../../overtime-policy/overtime-policy.service';
import { OvertimePolicyConfiguration } from '../overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '../overtime-policy-configuration.service';
import { WorkFromHomePeriodType } from '../../../../../models/common/types/workfromhomeperiodtype';
import { OvertimePolicyCalculationComponent } from '../overtime-policy-calculation/overtime-policy-calculation.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-overtime-policy-configuration-edit',
  templateUrl: './overtime-policy-configuration-edit.component.html'
})
export class OvertimePolicyConfigurationEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  overtimePolicy: OvertimePolicy;
  overtimePolicyConfiguration: OvertimePolicyConfiguration;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: number[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private overtimePolicyService: OvertimePolicyService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.periodTypeKeys = Object.keys(this.periodTypes).filter(Number).map(Number);

    this.onChanges();

    this.route.params.subscribe(params => {
      this.getOvertimePolicy(params.overtimePolicyId);
      this.getOvertimeConfiguration(params.overtimePolicyId);
    });

  }

  getOvertimePolicy(overtimePolicyId) {
    this.overtimePolicyService.get(overtimePolicyId).subscribe((result) => {
      this.overtimePolicy = result;
      this.editForm.patchValue({
        overtimePolicyId: this.overtimePolicy.id,
        overtimePolicyName: this.overtimePolicy.name,
      });
    },
    error => {
      console.error(error);
    });
  }

  getOvertimeConfiguration(overtimePolicyId) {
    this.overtimePolicyConfigurationService.getByOverTimePolicyId(overtimePolicyId).subscribe((result) => {
      this.overtimePolicyConfiguration = result;
      this.editForm.patchValue(this.overtimePolicyConfiguration);
    },
    error => {
      console.error(error);
    });
  }

  onChanges(): void {
    this.editForm.get('isApprovalRequired').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('maximumLimit').enable();
        this.editForm.get('noticeDays').enable();
        this.editForm.get('periodType').enable();
      } else {
        this.editForm.get('noticeDays').disable();
        this.editForm.get('maximumLimit').disable();
        this.editForm.get('periodType').disable();

        this.editForm.patchValue({ maximumLimit: null, noticeDays: null, periodType: null });
      }
    });

    this.editForm.get('isPastDayRQPossible').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('maximumPastDayLimit').enable();
      } else {
        this.editForm.get('maximumPastDayLimit').disable();
        this.editForm.patchValue( {maximumPastDayLimit: null} );
      }
    });

    this.editForm.get('isRoundOffRequired').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('roundOffType').enable();
        this.editForm.patchValue( {isRoundOffNearest: true} );
      } else {
        this.editForm.get('roundOffType').disable();
        this.editForm.patchValue( {roundOffType: 1, isRoundOffNearest: false, isRoundOffLowest: false} );
      }
    });

    this.editForm.get('roundOffType').valueChanges.subscribe(value => {
      if (value === 1) {
        this.editForm.patchValue( {isRoundOffNearest: true} );
        this.editForm.patchValue( {isRoundOffLowest: false} );
      } else {
        this.editForm.patchValue( {isRoundOffNearest: false} );
        this.editForm.patchValue( {isRoundOffLowest: true} );
      }
    });
  }

  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = this.editForm.get(type).value;

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.editForm.get(type).patchValue(result);
      }
    });
  }

  onSubmit() {
    this.overtimePolicyConfigurationService.update(this.editForm.value).subscribe(() => {
      this.toastr.showSuccessMessage('Overtime Policy configured successfully!');
      this.router.navigate(['./settings/overtime']);
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to configure overtime policy');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      overtimePolicyId: [null],
      overtimePolicyName: [null],
      isApprovalRequired: [false],
      isCommentRequired: [false],
      isPastDayRQPossible: [false],
      isRoundOffRequired: [false],
      isRoundOffNearest: [false],
      isRoundOffLowest: [false],
      roundOffType: [{ value: 1, disabled: true }],
      noticeDays: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      maximumLimit: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      periodType: [{ value: null, disabled: true }, [
        Validators.required
      ]],
      maximumPastDayLimit: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      lastDayLimit: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      minimumOverTimeHour: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      timeBeyondShiftHour: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      normalFormula: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      holidayFormula: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      specialFormula: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      createdDate: [],
    });
  }
}
