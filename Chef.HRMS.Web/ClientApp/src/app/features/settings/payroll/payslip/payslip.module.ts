import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DndModule } from 'ng2-dnd';

import { PayslipConfigurationComponent } from './payslip-configuration/payslip-configuration.component';



@NgModule({
  declarations: [
    PayslipConfigurationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayslipConfigurationComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payslip Configuration'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: PayslipConfigurationComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payslip Configuration'], name: 'settings-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DndModule.forRoot()
  ]
})
export class PayslipModule { }
