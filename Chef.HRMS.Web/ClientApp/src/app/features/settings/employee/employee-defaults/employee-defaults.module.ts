import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeDefaultsEditComponent } from './employee-defaults-edit/employee-defaults-edit.component';
import { EmployeeDefaultsViewComponent } from './employee-defaults-view/employee-defaults-view.component';



@NgModule({
  declarations: [
    EmployeeDefaultsEditComponent, 
    EmployeeDefaultsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: EmployeeDefaultsEditComponent,
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Defaults'], name: 'settings-employee' }
      },
      {
        path: '', 
        component: EmployeeDefaultsEditComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Defaults'], name: 'settings-employee' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule
  ]
})
export class EmployeeDefaultsModule { }
