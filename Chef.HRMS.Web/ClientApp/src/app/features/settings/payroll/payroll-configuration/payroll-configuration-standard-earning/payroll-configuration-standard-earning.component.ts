import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PayrollConfigurationService } from '../payroll-configuration.service';
import { PayrollConfiguration } from '../payroll-configuration.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-configuration-standard-earning',
  templateUrl: './payroll-configuration-standard-earning.component.html'
})
export class PayrollConfigurationStandardEarningComponent implements OnChanges {

  currentUserId: number;
  editForm: FormGroup;

  @Input() payrollConfiguration: PayrollConfiguration;
  @Input() isView: boolean;
  @Output() saveConfiguration = new EventEmitter<boolean>();

  constructor(
    private payrollConfigurationService: PayrollConfigurationService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.currentUserId = getCurrentUserId();

    if (changes.payrollConfiguration) {
      this.editForm = this.createFormGroup();
      this.editForm.patchValue(this.payrollConfiguration);
    }

    if (this.isView) {
      this.editForm.disable();
    }
  }

  onChange(element) {
    if (!element.checked && (element.id == 'isLossOfPayAffected')) {
      this.editForm.patchValue({isDifferenceAmountAdjustable: false});
    }
  }

  onSubmit() {
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
      id: [null],
      isCustomizedAndOverridenAtEmployeeLevel: [false],
      isConfigured: [false],
      isDifferenceAmountAdjustable: [false],
      isLossOfPayAffected: [false],
      isPartOfArrearCalculation: [false],
      maximumLimit: ['', [
        Validators.max(999999999),
        Validators.min(1),
        Validators.required
      ]],
      payrollComponentType: [null],
      shortCode: [''],
      name: [''],
      payrollComponentId: [],
      payrollStructureId: [],
      createdDate: [],
    });
  }

}
