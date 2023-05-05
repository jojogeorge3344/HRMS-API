import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { OvertimeRequestListComponent } from './overtime-request-list/overtime-request-list.component';
import { OvertimeRequestCreateComponent } from './overtime-request-create/overtime-request-create.component';
import { OvertimeRequestEditComponent } from './overtime-request-edit/overtime-request-edit.component';
import { OvertimeRequestViewComponent } from './overtime-request-view/overtime-request-view.component';
import { SelectDropDownModule } from "ngx-select-dropdown";



@NgModule({
  declarations: [
    OvertimeRequestListComponent,
    OvertimeRequestCreateComponent,
    OvertimeRequestEditComponent,
    OvertimeRequestViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: OvertimeRequestListComponent,
        data: { breadcrumbs: ['Me', 'Overtime'], name: 'me-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule,
    SelectDropDownModule
  ]
})
export class EmployeeOvertimeModule { }
