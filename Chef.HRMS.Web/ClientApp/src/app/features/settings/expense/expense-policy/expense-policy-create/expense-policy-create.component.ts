import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpensePolicyService } from '../expense-policy.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-policy-create',
  templateUrl: './expense-policy-create.component.html'
})
export class ExpensePolicyCreateComponent implements OnInit {

  currentUserId: number;
  addForm: FormGroup;

  @Input() expensePolicyNames: string[];


  constructor(
    private expensePolicyService: ExpensePolicyService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
    }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.expensePolicyService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Expense Policy already exists!');
      } else {
        this.activeModal.close(result.id);
        this.toastr.showSuccessMessage('Expense Policy is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Expense Policy');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 -])+$'),
        duplicateNameValidator(this.expensePolicyNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128),
      ]],
      currency: [null, [
        Validators.required,
        Validators.maxLength(3),
      ]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
}
