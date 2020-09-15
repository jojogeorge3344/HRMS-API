import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseTypeService } from '../../expense-type/expense-type.service';
import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-type-create',
  templateUrl: './expense-type-create.component.html'
})
export class ExpenseTypeCreateComponent implements OnInit {

  currentUserId: number;
  addForm: FormGroup;

  @Input() expenseCategoryType: ExpenseCategoryType;
  @Input() expenseCategoryTypeKeys: number[];
  @Input() expenseTypeNames: string[];
  @Input() expenseTypeCodes: string[];


  constructor(
    private expenseTypeService: ExpenseTypeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  get name() { return this.addForm.get('name'); }

  get code() { return this.addForm.get('code'); }

  onSubmit() {
    this.expenseTypeService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Expense type already exists!');
      } else {
        this.activeModal.close('submit');
        this.toastr.showSuccessMessage('Expense type is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the expense type');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.expenseTypeNames)
      ]],
      code: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.pattern('^([a-zA-Z0-9-])+$'),
        duplicateNameValidator(this.expenseTypeCodes)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      category: [null, [
        Validators.required,
      ]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }
}
