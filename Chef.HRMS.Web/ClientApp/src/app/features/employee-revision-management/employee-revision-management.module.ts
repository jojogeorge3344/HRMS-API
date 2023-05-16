import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRevisionManagementListComponent } from './employee-revision-management-list/employee-revision-management-list.component';
import { EmployeeRevisionManagementCreateComponent } from './employee-revision-management-create/employee-revision-management-create.component';
import { EmployeeRevisionManagementViewComponent } from './employee-revision-management-view/employee-revision-management-view.component';
import { EmployeeRevisionManagementEditComponent } from './employee-revision-management-edit/employee-revision-management-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CUSTOM_ERROR_MESSAGES, NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { RouterModule } from '@angular/router';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { SelectDropDownModule } from "ngx-select-dropdown";
import { DirectivesModule } from 'src/app/directives/directives.module';
import { SharedModule } from '@shared/shared.module';
import { EmployeeRevisionPrintComponent } from './employee-revision-print/employee-revision-print.component';
import { ReportViewerModule } from "@shared/report-viewer/report-viewer.module";


@NgModule({
  declarations: [EmployeeRevisionManagementListComponent, EmployeeRevisionManagementCreateComponent, EmployeeRevisionManagementViewComponent, EmployeeRevisionManagementEditComponent, EmployeeRevisionPrintComponent],
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
        component: EmployeeRevisionManagementListComponent,
        data: {  breadcrumbs: ["Organization", "Employee Revision"], 
        name: 'organization-employee-revision-management' }
      },
      {
        path: "create",
        component: EmployeeRevisionManagementCreateComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Revision", "Create"],
          name: 'organization-employee-revision-management'
        },
      },
      {
        path: ":id/view",
        component: EmployeeRevisionManagementViewComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Revision", "View"],
          name: 'organization-employee-revision-management'
        },
      },
      {
        path: ":id/edit",
        component: EmployeeRevisionManagementEditComponent,
        data: {
          breadcrumbs: ["Organization", "Employee Revision", "edit"],
          name: 'organization-employee-revision-management'
        },
      },
      {
        path: 'print/:id', component: EmployeeRevisionPrintComponent,
        data: { breadcrumbs: ['Organization', 'Employee Revision', "print"], name: 'organization-employee-revision-management' }
        
      }
      
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
export class EmployeeRevisionManagementModule { }
