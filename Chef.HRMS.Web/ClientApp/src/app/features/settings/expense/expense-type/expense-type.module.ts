import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { ExpenseTypeListComponent } from './expense-type-list/expense-type-list.component';
import { ExpenseTypeCreateComponent } from './expense-type-create/expense-type-create.component';
import { ExpenseTypeEditComponent } from './expense-type-edit/expense-type-edit.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';



@NgModule({
  declarations: [
    ExpenseTypeListComponent,
    ExpenseTypeCreateComponent, 
    ExpenseTypeEditComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: ExpenseTypeListComponent,
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Type'], name: 'settings-expense' }
      },
      {
        path: '', 
        component: ExpenseTypeListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Type'], name: 'settings-expense' }
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
export class ExpenseTypeModule { }
