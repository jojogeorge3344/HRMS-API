import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeNumbersListComponent } from './employee-numbers-list/employee-numbers-list.component';
import { EmployeeNumbersCreateComponent } from './employee-numbers-create/employee-numbers-create.component';
import { EmployeeNumbersEditComponent } from './employee-numbers-edit/employee-numbers-edit.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeNumbersViewComponent } from './employee-numbers-view/employee-numbers-view.component';




@NgModule({
  declarations: [
    EmployeeNumbersListComponent,
    EmployeeNumbersCreateComponent, 
    EmployeeNumbersEditComponent, EmployeeNumbersViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: EmployeeNumbersListComponent,
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Numbers'], name: 'settings-employee' }
      },
      {
        path: '', 
        component: EmployeeNumbersListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Employee', 'Employee Numbers'], name: 'settings-employee' }
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
export class EmployeeNumbersModule { }
