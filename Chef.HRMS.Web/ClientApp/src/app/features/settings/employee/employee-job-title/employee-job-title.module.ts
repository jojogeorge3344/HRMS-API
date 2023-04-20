import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeJobTitleListComponent } from './employee-job-title-list/employee-job-title-list.component';
import { EmployeeJobTitleCreateComponent } from './employee-job-title-create/employee-job-title-create.component';
import { EmployeeJobTitleEditComponent } from './employee-job-title-edit/employee-job-title-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeJobTitleViewComponent } from './employee-job-title-view/employee-job-title-view.component';



@NgModule({
  declarations: [
    EmployeeJobTitleListComponent,
    EmployeeJobTitleCreateComponent, 
    EmployeeJobTitleEditComponent, 
    EmployeeListComponent, EmployeeJobTitleViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: EmployeeJobTitleListComponent,
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Job Title'], name: 'settings-employee' }
      },
      {
        path: '', 
        component: EmployeeJobTitleListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Job Title'], name: 'settings-employee' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule
  ], providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class EmployeeJobTitleModule { }
