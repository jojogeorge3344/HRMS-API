import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayrollLOPSettingsEditComponent } from './payroll-lop-settings-edit/payroll-lop-settings-edit.component';
import { PayrollLopFormulaEditComponent } from './payroll-lop-formula-edit/payroll-lop-formula-edit.component';


@NgModule({
  declarations: [
    PayrollLOPSettingsEditComponent,
    PayrollLopFormulaEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PayrollLOPSettingsEditComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'LOP Calculation'], name: 'settings-overtime' }
      },
      {
        path: '',
        component: PayrollLOPSettingsEditComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'LOP Calculation'], name: 'settings-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule,
  ]
})
export class PayrollLOPSettingsModule { }
