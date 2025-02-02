import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PayrollConfigurationService } from '../payroll-configuration.service';
import { PayrollConfiguration } from '../payroll-configuration.model';
import { ClaimFrequencyType } from 'src/app/models/common/types/claimfrequencytype';
import { PayoutPatternType } from 'src/app/models/common/types/payoutpatterntype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-configuration-reimbursable',
  templateUrl: './payroll-configuration-reimbursable.component.html'
})
export class PayrollConfigurationReimbursableComponent implements OnChanges {

  editForm: FormGroup;
  currentUserId: number;
  isUpdateFieldRequired: boolean;

  claimFrequencyTypes = ClaimFrequencyType;
  claimFrequencyTypeKeys: number[];

  payoutPatternTypes = PayoutPatternType;
  payoutPatternTypeKeys: number[];


  @Input() payrollConfiguration: PayrollConfiguration;
  @Input() isView: boolean;
  @Output() saveConfiguration = new EventEmitter<boolean>();

  constructor(
    private payrollConfigurationService: PayrollConfigurationService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.claimFrequencyTypeKeys = Object.keys(this.claimFrequencyTypes).filter(Number).map(Number);
    this.payoutPatternTypeKeys = Object.keys(this.payoutPatternTypes).filter(Number).map(Number);

    this.currentUserId = getCurrentUserId();

    if (changes.payrollConfiguration) {
      this.editForm = this.createFormGroup();

      if (this.payrollConfiguration.claimLimit) {
        this.isUpdateFieldRequired = true;
        this.onUpdate(true);
      }

      this.editForm.patchValue(this.payrollConfiguration);
    }

    if (this.isView) {
      this.editForm.disable();
    }
  }

  updateValidation(maximumLimit) {
    const claimLimitControl = this.editForm.get('claimLimit') as FormControl;
    if (claimLimitControl) {
      claimLimitControl.setValidators([Validators.max(maximumLimit)]);
      claimLimitControl.updateValueAndValidity();
    }
  }

  onUpdate(checked) {
    if (checked) {
      const maximumLimitControl = this.editForm.get('maximumLimit') as FormControl;

      this.editForm.addControl('claimFrequency', new FormControl(null, Validators.required));
      this.editForm.addControl('claimLimit', new FormControl('', [Validators.required, Validators.min(1), Validators.max(maximumLimitControl.value)]));
      this.editForm.addControl('payoutPattern', new FormControl(null, Validators.required));

      this.isUpdateFieldRequired = true;
    } else {
      this.editForm.removeControl('claimFrequency');
      this.editForm.removeControl('claimLimit');
      this.editForm.removeControl('payoutPattern');
      this.isUpdateFieldRequired = false;
    }
  }

  onChange(element) {
    if (!element.checked) {
      if (element.id == 'isLossOfPayAffected') {
        this.editForm.patchValue({ isDifferenceAmountAdjustable: false });
      }

      if (element.id == 'isPaidSeparately') {
        this.editForm.patchValue({ isVisibleInPayslip: false });
      }
    }
  }

  onSubmit() {
    debugger
    if(this.payrollConfiguration){
      this.editForm.patchValue({
        name:this.payrollConfiguration.name,
        shortCode:this.payrollConfiguration.shortCode
      })
    }
    this.editForm.patchValue({ isConfigured: true });
    this.payrollConfigurationService.update(this.editForm.value).subscribe(() => {
      this.toastr.showSuccessMessage('Payroll component configured successfully!');
      this.saveConfiguration.emit(this.editForm.value);
    },
      error => {
        this.saveConfiguration.emit(false);
        console.error(error);
        this.toastr.showErrorMessage('Unable to configure payroll component');
      });
  }

  validateNumber(ev) {
    const keyCode = ev.keyCode;
    const excludedKeys = [8, 110, 190];
   if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      ev.preventDefault();
    }
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      isCustomizedAndOverridenAtEmployeeLevel: [false],
      isConfigured: [false],
      isDifferenceAmountAdjustable: [false],
      isLossOfPayAffected: [false],
      isPaidSeparately: [false],
      isPartOfArrearCalculation: [false],
      isPartOfEarningsAndDeductions: [false],
      isPartOfLossOfPayCalculation: [false],
      isProofRequired: [false],
      isRecurring: [false],
      isVisibleInPayslip: [false],
      maximumLimit: ['', [
        Validators.max(999999999),
        Validators.min(1),
        Validators.required
      ]],
      payrollComponentType: [0],
      shortCode: [''],
      name: [''],
      payrollComponentId: [0],
      payrollStructureId: [0],
      createdDate: [new Date()],
    });
  }
}
