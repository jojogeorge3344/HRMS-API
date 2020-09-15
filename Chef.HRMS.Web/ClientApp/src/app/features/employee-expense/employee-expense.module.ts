import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { ExpenseRequestListComponent } from './expense-request-list/expense-request-list.component';
import { ExpenseRequestCreateComponent } from './expense-request-create/expense-request-create.component';
import { ExpenseRequestEditComponent } from './expense-request-edit/expense-request-edit.component';
import { ExpenseRequestViewComponent } from './expense-request-view/expense-request-view.component';

@NgModule({
  declarations: [
    ExpenseRequestListComponent,
    ExpenseRequestCreateComponent,
    ExpenseRequestEditComponent,
    ExpenseRequestViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: ExpenseRequestListComponent,
        data: { breadcrumbs: ['Me', 'Expense'], name: 'me-expense' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule
  ]
})
export class EmployeeExpenseModule { }
