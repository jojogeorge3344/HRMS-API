import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeProfileContainerComponent } from './employee-profile-container/employee-profile-container.component';
import { EmployeeJobDetailsViewComponent } from './employee-job-details/employee-job-details-view/employee-job-details-view.component';

import { EmployeePrimaryDetailsViewComponent } from './employee-primary-details/employee-primary-details-view/employee-primary-details-view.component';
import { EmployeePrimaryDetailsEditComponent } from './employee-primary-details/employee-primary-details-edit/employee-primary-details-edit.component';

import { EmployeeAddressDetailsEditComponent } from './employee-address-details/employee-address-details-edit/employee-address-details-edit.component';
import { EmployeeAddressDetailsViewComponent } from './employee-address-details/employee-address-details-view/employee-address-details-view.component';

import { EmployeeContactDetailsEditComponent } from './employee-contact-details/employee-contact-details-edit/employee-contact-details-edit.component';
import { EmployeeContactDetailsViewComponent } from './employee-contact-details/employee-contact-details-view/employee-contact-details-view.component';

import { EmployeeDependentDetailsListComponent } from './employee-dependent-details/employee-dependent-details-list/employee-dependent-details-list.component';
import { EmployeeDependentDetailsCreateComponent } from './employee-dependent-details/employee-dependent-details-create/employee-dependent-details-create.component';
import { EmployeeDependentDetailsEditComponent } from './employee-dependent-details/employee-dependent-details-edit/employee-dependent-details-edit.component';
import { EmployeeDependentDetailsViewComponent } from './employee-dependent-details/employee-dependent-details-view/employee-dependent-details-view.component';




@NgModule({
  declarations: [
    EmployeeProfileContainerComponent,
    EmployeeJobDetailsViewComponent,
    EmployeePrimaryDetailsViewComponent,
    EmployeePrimaryDetailsEditComponent,
    EmployeeAddressDetailsEditComponent,
    EmployeeAddressDetailsViewComponent,
    EmployeeContactDetailsEditComponent,
    EmployeeContactDetailsViewComponent,
    EmployeeDependentDetailsListComponent,
    EmployeeDependentDetailsCreateComponent,
    EmployeeDependentDetailsEditComponent,
    EmployeeDependentDetailsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: EmployeeProfileContainerComponent,
        data: { breadcrumbs: ['Me', 'Profile'], name: 'me-myprofile' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    PipesModule
  ]
})
export class EmployeeProfileModule { }
