import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { ExpenseTypeCreateComponent } from '../expense-type-create/expense-type-create.component';
import { ExpenseTypeEditComponent } from '../expense-type-edit/expense-type-edit.component';

import { ExpenseTypeService } from '../../expense-type/expense-type.service';
import { ExpenseType } from '../../expense-type/expense-type.model';
import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-type-list',
  templateUrl: './expense-type-list.component.html'
})
export class ExpenseTypeListComponent implements OnInit, OnDestroy {

  expenseTypes: any;
  expenseCategoryType = ExpenseCategoryType;
  expenseCategoryTypeKeys: number[];
  assignedExpenseTypes: number[] = [];

  expenseTypeNames: string[];
  expenseTypeCodes: string[];

  constructor(
    private expenseTypeService: ExpenseTypeService,
    private toastr: ToasterDisplayService,
    private modalService: NgbModal) {
      this.expenseCategoryTypeKeys = Object.keys(this.expenseCategoryType).filter(Number).map(Number);
    }

  ngOnDestroy(): void {
  this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.getAllExpenseTypes();
    this.getAssignedExpenseTypes();
  }

  getAssignedExpenseTypes() {
    this.expenseTypeService.getAssignedExpenseTypes().subscribe(res => {
      this.assignedExpenseTypes = res;
    },
    error => {
      console.error(error);
    });
  }

  getAllExpenseTypes() {
    this.expenseTypeService.getAll().subscribe(res => {
      this.expenseTypes = res;
      this.expenseTypeNames = this.expenseTypes.map(a => a.name.toLowerCase());
      this.expenseTypeCodes = this.expenseTypes.map(a => a.code.toLowerCase());
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the expense types');
    });
  }

  isDisabled(expenseType) {
    return this.assignedExpenseTypes.includes(expenseType.id);
  }

  openCreateExpenseType() {
    const modalRef = this.modalService.open(ExpenseTypeCreateComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.expenseCategoryType = this.expenseCategoryType;
    modalRef.componentInstance.expenseCategoryTypeKeys = this.expenseCategoryTypeKeys;
    modalRef.componentInstance.expenseTypeNames = this.expenseTypeNames;
    modalRef.componentInstance.expenseTypeCodes = this.expenseTypeCodes;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllExpenseTypes();
      }
    });
  }

  openEditExpenseType(expenseType: ExpenseType) {
    const modalRef = this.modalService.open(ExpenseTypeEditComponent,
      {centered: true, backdrop: 'static' });

    modalRef.componentInstance.expenseType = expenseType;
    modalRef.componentInstance.expenseCategoryType = this.expenseCategoryType;
    modalRef.componentInstance.expenseCategoryTypeKeys = this.expenseCategoryTypeKeys;
    modalRef.componentInstance.isDisabled = this.isDisabled(expenseType);
    modalRef.componentInstance.expenseTypeNames = this.expenseTypeNames.filter(v => v !== expenseType.name.toLowerCase());
    modalRef.componentInstance.expenseTypeCodes = this.expenseTypeCodes.filter(v => v !== expenseType.code.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllExpenseTypes();
      }
    });
  }

  deleteExpenseType(expenseType: ExpenseType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the expense type "${expenseType.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.expenseTypeService.delete(expenseType.id).subscribe(() => {
          this.toastr.showSuccessMessage('The expense type deleted successfully!');
          this.getAllExpenseTypes();
        });
      }
    });
  }
}
