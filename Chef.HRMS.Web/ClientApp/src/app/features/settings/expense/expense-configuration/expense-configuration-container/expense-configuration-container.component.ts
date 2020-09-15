import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ExpenseConfigurationService } from '../expense-configuration.service';
import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { ExpenseConfiguration } from '../expense-configuration.model';
import { ExpensePolicy } from '../../expense-policy/expense-policy.model';
import { ExpensePolicyService } from '@settings/expense/expense-policy/expense-policy.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-configuration-container',
  templateUrl: './expense-configuration-container.component.html'
})
export class ExpenseConfigurationContainerComponent implements OnInit {

  selected: number = null;
  currentCategory: number = null;
  expenseCategoryTypes = ExpenseCategoryType;
  assignedExpenseTypes: ExpenseConfiguration[];
  expensePolicy: ExpensePolicy;
  currentExpenseConfiguration: ExpenseConfiguration;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    private expensePolicyService: ExpensePolicyService,
    private expenseConfigurationService: ExpenseConfigurationService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getExpensePolicy(params.id);
    });
  }

  getExpensePolicy(id) {
    this.expensePolicyService.get(id).subscribe((result) => {
      this.expensePolicy = result;
      this.getExpenseTypes(this.expensePolicy.id);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the expense policy');
      });
  }

  getExpenseTypes(expensePolicyId) {
    this.expenseConfigurationService.getAll(expensePolicyId).subscribe((result: any) => {
      this.assignedExpenseTypes = result;
      this.selectExpenseType(0);
    },
      error => {
        console.error(error);
      });
  }

  selectExpenseType(index) {
    this.selected = index;
    this.currentCategory = this.assignedExpenseTypes[index].category;
    this.currentExpenseConfiguration = this.assignedExpenseTypes[index];
  }

  isLastStep(): boolean {
    return this.selected === (this.assignedExpenseTypes.length - 1);
  }

  isAllConfigured(): boolean {
    return this.assignedExpenseTypes.every(e => e.isConfigured);
  }

  onSubmit(updatedExpenseConfiguration) {
    this.assignedExpenseTypes[this.selected] = updatedExpenseConfiguration;

    if (this.isAllConfigured() && this.isLastStep()) {
      this.router.navigate(['settings/expense/expense-policy'], { queryParams: { expensePolicyId: this.expensePolicy.id } });
    }
    this.selectExpenseType(this.selected + 1);
  }
}
