import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ExpenseConfigurationService } from '../expense-configuration.service';
import { ExpenseCategoryType } from '../../../../../models/common/types/expensecategorytype';
import { ExpenseConfiguration } from '../expense-configuration.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-configuration-edit',
  templateUrl: './expense-configuration-edit.component.html'
})
export class ExpenseConfigurationEditComponent implements OnInit {

  category = 0;
  expenseType = '';
  expenseCategoryTypes = ExpenseCategoryType;
  expenseConfiguration: ExpenseConfiguration;
  isView = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
    private expenseConfigurationService: ExpenseConfigurationService) { }

  ngOnInit(): void {
    this.isView = (this.route.snapshot.url[1].path === 'view');
    this.route.params.subscribe(params => {
      this.expenseConfigurationService.get(params.configurationId).subscribe((result) => {
        this.expenseConfiguration = result;
        this.category = result.category;
        this.expenseType = result.name;
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to fetch the expense policy configuration');
        });
    });
  }

  onSubmit() {
    this.router.navigate(
      ['settings/expense/expense-policy'],
      { queryParams: { expensePolicyId: this.expenseConfiguration.expensePolicyId } });
  }
}
