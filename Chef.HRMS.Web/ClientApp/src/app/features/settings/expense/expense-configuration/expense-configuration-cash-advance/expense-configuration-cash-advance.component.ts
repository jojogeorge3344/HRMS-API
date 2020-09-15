import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ExpenseConfigurationService } from '../expense-configuration.service';
import { ExpenseConfiguration } from '../expense-configuration.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-configuration-cash-advance',
  templateUrl: './expense-configuration-cash-advance.component.html'
})
export class ExpenseConfigurationCashAdvanceComponent implements OnChanges {

  currentUserId: number;
  editForm: FormGroup;

  @Input() expenseConfiguration: ExpenseConfiguration;
  @Input() isView: boolean;
  @Output() saveConfiguration = new EventEmitter<boolean>();

  constructor(
    private expenseConfigurationService: ExpenseConfigurationService,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.currentUserId = getCurrentUserId();

    if (changes.expenseConfiguration) {
      this.editForm = this.createFormGroup();
      this.editForm.patchValue(this.expenseConfiguration);
      this.editForm.patchValue({ modifiedBy: this.currentUserId });
    }

    if (this.isView) {
      this.editForm.disable();
    }
  }

  onChange(element) {
    if (element.checked) {
     this.editForm.get('maximumExpenseLimit').enable();
    } else {
      this.editForm.get('maximumExpenseLimit').disable();
      this.editForm.patchValue({
        maximumExpenseLimit: 0,
      });
    }
  }

  onSubmit() {
    this.editForm.patchValue({ isConfigured: true });
    this.expenseConfigurationService.update(this.editForm.value).subscribe(() => {
      this.toastr.showSuccessMessage('Expense type configured successfully!');
      this.saveConfiguration.emit(this.editForm.value);
    },
    error => {
      this.saveConfiguration.emit(false);
      console.error(error);
      this.toastr.showErrorMessage('Unable to configure expense policy');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      category: [null],
      expenseTypeId: [null],
      expensePolicyId: [null],
      expensePolicyName: [null],
      isConfigured: [false],
      name: [''],
      code: [''],
      currency: [''],
      isExpenseLimitEnabled: [false],
      maximumExpenseLimit: [{
        value: null,
        disabled: !this.expenseConfiguration.isExpenseLimitEnabled
      }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      isProofRequired: [false],
      daysPassed: [null, [
        Validators.required,
        Validators.min(1) ,
        Validators.max(365)
      ]],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId]
    });
  }
}
