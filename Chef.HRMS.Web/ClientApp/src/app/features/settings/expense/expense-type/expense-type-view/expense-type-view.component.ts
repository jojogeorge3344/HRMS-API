import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpenseTypeService } from '../../expense-type/expense-type.service';
import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { ExpenseType } from '../expense-type.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-type-view',
  templateUrl: './expense-type-view.component.html',
  styleUrls: ['./expense-type-view.component.scss']
})
export class ExpenseTypeViewComponent implements OnInit {

  currentUserId: number;
  editForm: FormGroup;

  @Input() expenseType: ExpenseType;
  @Input() expenseCategoryType: ExpenseCategoryType;
  @Input() expenseCategoryTypeKeys: number[];
  @Input() isDisabled: boolean;
  @Input() expenseTypeNames: string[];
  @Input() expenseTypeCodes: string[];


  constructor(
    private expenseTypeService: ExpenseTypeService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    debugger
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    console.log(this.expenseType)
  }

  get name() { return this.editForm.get('name'); }

  get code() { return this.editForm.get('code'); }


  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.expenseType.id],
      name: [this.expenseType.name, [
        Validators.required,
        Validators.maxLength(50),
        //Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.expenseTypeNames)
      ]],
      code: [this.expenseType.code, [
        Validators.required,
        Validators.maxLength(30),
        //Validators.pattern('^([a-zA-Z0-9-])+$'),
        duplicateNameValidator(this.expenseTypeCodes)
      ]],
      description: [this.expenseType.description, [
        Validators.required,
        Validators.maxLength(128)
      ]],
    
    });
  }

}




