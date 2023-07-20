import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { RouterModule } from '@angular/router';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedModule } from '@shared/shared.module';
import { ReportViewerModule } from "@shared/report-viewer/report-viewer.module";
import { EmployeeEncashmentCreateComponent } from './employee-encashment-create/employee-encashment-create.component';
import { EmployeeEncashmentEditComponent } from './employee-encashment-edit/employee-encashment-edit.component';
import { EmployeeEncashmentListComponent } from './employee-encashment-list/employee-encashment-list.component';
import { EmployeeEncashmentViewComponent } from './employee-encashment-view/employee-encashment-view.component';


@NgModule({
  declarations: [EmployeeEncashmentListComponent, EmployeeEncashmentCreateComponent, EmployeeEncashmentViewComponent, EmployeeEncashmentEditComponent],
  imports: [
    
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: EmployeeEncashmentListComponent,
        data: {  breadcrumbs: ["Organization", "Employee Encashment"], 
        name: 'organization-employee-encashment' }
      },
      {
        path: "create",
        component: EmployeeEncashmentCreateComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Encashment", "Create"],
          name: 'organization-employee-encashment'
        },
      },
      {
        path: ":id/view",
        component: EmployeeEncashmentViewComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Encashment", "View"],
          name: 'organization-employee-encashment'
        },
      },
      {
        path: ":id/edit",
        component: EmployeeEncashmentEditComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Encashment", "edit"],
          name: 'organization-employee-encashment'
        },
      },
      
    ]),

    NgBootstrapFormValidationModule.forRoot(),
    DirectivesModule,
    SharedModule,
    SelectDropDownModule,
    ReportViewerModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
  ]
})
export class EmployeeEncashmentModule { }
