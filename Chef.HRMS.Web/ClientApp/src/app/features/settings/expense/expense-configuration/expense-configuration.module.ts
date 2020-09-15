import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { ExpenseConfigurationContainerComponent } from './expense-configuration-container/expense-configuration-container.component';
import { ExpenseConfigurationEditComponent } from './expense-configuration-edit/expense-configuration-edit.component';
import { ExpenseConfigurationGeneralComponent } from './expense-configuration-general/expense-configuration-general.component';
import { ExpenseConfigurationPerdiemComponent } from './expense-configuration-perdiem/expense-configuration-perdiem.component';
import { ExpenseConfigurationMileageComponent } from './expense-configuration-mileage/expense-configuration-mileage.component';
import { ExpenseConfigurationCashAdvanceComponent } from './expense-configuration-cash-advance/expense-configuration-cash-advance.component';



@NgModule({
  declarations: [
    ExpenseConfigurationContainerComponent, 
    ExpenseConfigurationEditComponent, 
    ExpenseConfigurationGeneralComponent, 
    ExpenseConfigurationPerdiemComponent,
    ExpenseConfigurationMileageComponent, 
    ExpenseConfigurationCashAdvanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: ExpenseConfigurationContainerComponent,
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Policy Configuration'], name: 'settings-expense' }
      },
      { path: ':configurationId/edit', 
        component: ExpenseConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Policy Configuration'], name: 'settings-expense' }
      },
      { path: ':configurationId/view', 
        component: ExpenseConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Expense', 'Expense Policy Configuration'], name: 'settings-expense' }
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
export class ExpenseConfigurationModule { }
