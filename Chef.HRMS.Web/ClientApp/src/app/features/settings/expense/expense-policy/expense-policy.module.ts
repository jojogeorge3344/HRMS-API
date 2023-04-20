import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { ExpensePolicyListComponent } from './expense-policy-list/expense-policy-list.component';
import { ExpensePolicyCreateComponent } from './expense-policy-create/expense-policy-create.component';
import { ExpensePolicyEditComponent } from './expense-policy-edit/expense-policy-edit.component';
import { ExpensePolicyAssignComponent } from './expense-policy-assign/expense-policy-assign.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { ExpensePolicyViewComponent } from './expense-policy-view/expense-policy-view.component';



@NgModule({
  declarations: [
    ExpensePolicyListComponent, 
    ExpensePolicyCreateComponent, 
    ExpensePolicyEditComponent, 
    ExpensePolicyAssignComponent, ExpensePolicyViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: ExpensePolicyListComponent,
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Policy'], name: 'settings-expense' }
      },
      {
        path: '', 
        component: ExpensePolicyListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Policy'], name: 'settings-expense' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class ExpensePolicyModule { }
