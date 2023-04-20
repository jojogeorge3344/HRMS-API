import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeWpsListComponent } from './employee-wps-list/employee-wps-list.component';
import { EmployeeWpsCreateComponent } from './employee-wps-create/employee-wps-create.component';
import { EmployeeWpsEditComponent } from './employee-wps-edit/employee-wps-edit.component';
import { EmployeeWpsViewComponent } from './employee-wps-view/employee-wps-view.component';

@NgModule({
  declarations: [
    EmployeeWpsListComponent,
    EmployeeWpsCreateComponent,
    EmployeeWpsEditComponent,
    EmployeeWpsViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeWpsListComponent,
        data: { breadcrumbs: ['Settings', 'WPS', 'List'], name: 'settings-expense' }
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
  entryComponents: [
    EmployeeWpsCreateComponent,
    EmployeeWpsEditComponent,
  ]
})
export class WpsModule { }
