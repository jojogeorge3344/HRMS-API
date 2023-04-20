import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpensePolicyService } from '../expense-policy.service';
import { ExpensePolicy } from '../expense-policy.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-policy-edit',
  templateUrl: './expense-policy-edit.component.html'
})
export class ExpensePolicyEditComponent implements OnInit {

  editForm: FormGroup;

  currentUserId: number;
  @Input() expensePolicyNames: string[];
  @Input() expensePolicy: ExpensePolicy;
  @Input() isDisabled: boolean;

  constructor(
    private expensePolicyService: ExpensePolicyService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
    }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.expensePolicyService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Expense Policy already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Expense Policy is updated successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to edit the Expense Policy');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.expensePolicy.id],
      name: [this.expensePolicy.name, [
        Validators.required,
        Validators.maxLength(50),
        //Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.expensePolicyNames)
      ]],
      description: [this.expensePolicy.description, [
        Validators.required,
        Validators.maxLength(128),
      ]],
      currency: [{value: this.expensePolicy.currency, disabled: this.isDisabled}, [
        Validators.required,
        Validators.maxLength(3),
      ]],
      createdDate: [this.expensePolicy.createdDate],
    });
  }
}
