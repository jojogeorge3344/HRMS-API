import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { ExpensePolicyService } from '../expense-policy.service';
import { ExpenseTypeService } from '../../expense-type/expense-type.service';
import { ExpenseConfigurationService } from '../../expense-configuration/expense-configuration.service';

import { ExpensePolicyCreateComponent } from '../expense-policy-create/expense-policy-create.component';
import { ExpensePolicyEditComponent } from '../expense-policy-edit/expense-policy-edit.component';
import { ExpensePolicyAssignComponent } from '../expense-policy-assign/expense-policy-assign.component';

import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { ExpensePolicy } from '../expense-policy.model';
import { ExpenseType } from '../../expense-type/expense-type.model';
import { ExpenseConfiguration } from '../../expense-configuration/expense-configuration.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ExpensePolicyViewComponent } from '../expense-policy-view/expense-policy-view.component';


@Component({
  selector: 'hrms-expense-policy-list',
  templateUrl: './expense-policy-list.component.html'
})
export class ExpensePolicyListComponent implements OnInit {

  expensePolicies: ExpensePolicy[];
  allExpenseTypes: ExpenseType[];
  assignedExpensePolicies: number[] = [];
  expenseCategoryTypes = ExpenseCategoryType;
  expensePolicyConfigurations: ExpenseConfiguration[];

  firstOpen: number;
  expensePolicyNames: string[];

  constructor(
    private expensePolicyService: ExpensePolicyService,
    private expenseTypeService: ExpenseTypeService,
    private expensePolicyConfigurationService: ExpenseConfigurationService,
    private toastr: ToasterDisplayService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.firstOpen = params.expensePolicyId;
    });

    this.getExpensePolicies();
    this.getAllExpenseTypes();
    this.getAssignedExpensePolicies();
  }

  getExpensePolicies() {
    this.expensePolicyService.getAll().subscribe(result => {

      if (!this.firstOpen && result.length) {
        this.firstOpen = result[0].id;
      }

      this.getExpenseTypes(this.firstOpen);

      this.expensePolicies = result;
      this.expensePolicyNames = this.expensePolicies.map(a => a.name.toLowerCase());
    }, error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Expense Policies');
    });
  }

  getAssignedExpensePolicies() {
    this.expensePolicyService.getAllAssignedExpensePolicies().subscribe(res => {
      this.assignedExpensePolicies = res;
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(expensePolicyConfiguration) {
    return this.assignedExpensePolicies.includes(expensePolicyConfiguration.id);
  }

  getExpensePolicy(expensePolicyId: number): ExpensePolicy {
    return this.expensePolicies.find(v => v.id == expensePolicyId);
  }

  getExpenseTypes(expensePolicyId) {
    this.expensePolicyConfigurations = null;

    this.expensePolicyConfigurationService.getAll(expensePolicyId).subscribe((result: any) => {

      this.expensePolicyConfigurations = result;

      if (this.expensePolicyConfigurations.length === 0 && this.getExpensePolicy(expensePolicyId).isConfigured) {
        this.updateConfigured(expensePolicyId, false);
      }

      if (this.isAllConfigured()) {
        this.updateConfigured(expensePolicyId, true);
      }
    },
      error => {
        console.error(error);
      });
  }

  isAllConfigured(): boolean {
    return this.expensePolicyConfigurations.every(e => e.isConfigured);
  }

  updateConfigured(expensePolicyId: number, isConfigured: boolean) {
    this.expensePolicyService.updateExpensePolicy(expensePolicyId, isConfigured).subscribe((result) => {
      this.getExpensePolicy(expensePolicyId).isConfigured = isConfigured;
    },
      error => {
        console.error(error);
      });
  }

  getAllExpenseTypes() {
    this.expenseTypeService.getAll().subscribe(result => {
      this.allExpenseTypes = result;
    }, error => {
      console.error(error);
    });
  }

  openCreateExpensePolicy() {
    const modalRef = this.modalService.open(ExpensePolicyCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expensePolicyNames = this.expensePolicyNames;

    modalRef.result.then((result) => {
      if (!isNaN(result)) {
        this.firstOpen = result;
        this.getExpensePolicies();
      }
    });
  }

  openEditExpensePolicy(expensePolicy: ExpensePolicy) {
    const modalRef = this.modalService.open(ExpensePolicyEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expensePolicy = expensePolicy;
    modalRef.componentInstance.isDisabled = this.isDisabled(expensePolicy);
    modalRef.componentInstance.expensePolicyNames = this.expensePolicyNames.filter(v => v !== expensePolicy.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.firstOpen = expensePolicy.id;
        this.getExpensePolicies();
      }
    });
  }

  deleteExpensePolicy(expensePolicy: ExpensePolicy) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the expense policy "${expensePolicy.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.expensePolicyService.delete(expensePolicy.id).subscribe(() => {
          this.toastr.showSuccessMessage('The expense policy deleted successfully!');
          this.getExpensePolicies();
        });
      }
    });
  }

  openAssignExpenseTypes(expensePolicy: ExpensePolicy) {
    this.expensePolicyConfigurationService.getAll(expensePolicy.id).subscribe((result: any) => {
      this.expensePolicyConfigurations = result;

      const modalRef = this.modalService.open(ExpensePolicyAssignComponent,
        { centered: true, backdrop: 'static' });

      modalRef.componentInstance.expensePolicy = expensePolicy;
      modalRef.componentInstance.assignedExpenseTypes = this.expensePolicyConfigurations;
      modalRef.componentInstance.allExpenseTypes = this.allExpenseTypes;

      modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getExpenseTypes(expensePolicy.id);
        }
      });
    },
      error => {
        console.error(error);
      });
  }

  removeExpenseType(expensePolicyConfiguration: ExpenseConfiguration) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to remove the expense type "${expensePolicyConfiguration.name}?"`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.expensePolicyConfigurationService.delete(expensePolicyConfiguration.id).subscribe(() => {
          this.toastr.showSuccessMessage('The expense type removed from the expense policy successfully!');
          this.getExpenseTypes(expensePolicyConfiguration.expensePolicyId);
        });
      }
    });
  }

  openExpensePolicyConfiguration(expensePolicyConfiguration: ExpenseConfiguration, isDisabled: boolean) {
    if (isDisabled) {
      this.router.navigate(
        ['../' + expensePolicyConfiguration.expensePolicyId + '/expense-policy-configuration/' + expensePolicyConfiguration.id + '/view'],
        { relativeTo: this.route.parent });
    } else {
      this.router.navigate(
        ['../' + expensePolicyConfiguration.expensePolicyId + '/expense-policy-configuration/' + expensePolicyConfiguration.id + '/edit'],
        { relativeTo: this.route.parent });
    }
  }


  viewExpensePolicy(expensePolicy: ExpensePolicy){
    const modalRef = this.modalService.open(ExpensePolicyViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.expensePolicy = expensePolicy;
    modalRef.componentInstance.isDisabled = this.isDisabled(expensePolicy);
    modalRef.componentInstance.expensePolicyNames = this.expensePolicyNames.filter(v => v !== expensePolicy.name.toLowerCase());

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.firstOpen = expensePolicy.id;
        this.getExpensePolicies();
      }
    });
  }


}
