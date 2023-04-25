import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpensePolicyService } from '../expense-policy.service';
import { ExpensePolicy } from '../expense-policy.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-policy-view',
  templateUrl: './expense-policy-view.component.html',
  styleUrls: ['./expense-policy-view.component.scss']
})
export class ExpensePolicyViewComponent implements OnInit {

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

