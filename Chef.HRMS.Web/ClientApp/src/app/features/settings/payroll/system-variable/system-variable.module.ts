import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DndModule } from 'ng2-dnd';

import { SystemVariableComponent } from './system-variable.component';



@NgModule({
  declarations: [
    SystemVariableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: SystemVariableComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payslip Configuration'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: SystemVariableComponent,
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
