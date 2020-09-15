import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayrollConfigurationContainerComponent } from './payroll-configuration-container/payroll-configuration-container.component';
import { PayrollConfigurationEditComponent } from './payroll-configuration-edit/payroll-configuration-edit.component';
import { PayrollConfigurationStandardEarningComponent } from './payroll-configuration-standard-earning/payroll-configuration-standard-earning.component';
import { PayrollConfigurationStandardDeductionComponent } from './payroll-configuration-standard-deduction/payroll-configuration-standard-deduction.component';
import { PayrollConfigurationAllowanceComponent } from './payroll-configuration-allowance/payroll-configuration-allowance.component';
import { PayrollConfigurationReimbursableComponent } from './payroll-configuration-reimbursable/payroll-configuration-reimbursable.component';
import { PayrollConfigurationFixedComponent } from './payroll-configuration-fixed/payroll-configuration-fixed.component';



@NgModule({
  declarations: [
    PayrollConfigurationContainerComponent, 
    PayrollConfigurationEditComponent, 
    PayrollConfigurationStandardEarningComponent, 
    PayrollConfigurationStandardDeductionComponent, 
    PayrollConfigurationAllowanceComponent, 
    PayrollConfigurationReimbursableComponent, 
    PayrollConfigurationFixedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayrollConfigurationContainerComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Configuration'], name: 'settings-overtime' }
      },
      { path: ':id/edit', 
        component: PayrollConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Configuration'], name: 'settings-overtime'  }
      },
      { path: ':id/view', 
        component: PayrollConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Configuration'], name: 'settings-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule
  ]
})
export class PayrollConfigurationModule { }
