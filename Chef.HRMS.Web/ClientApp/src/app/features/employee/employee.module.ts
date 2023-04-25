import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES,
} from "ng-bootstrap-form-validation";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { DirectivesModule } from "src/app/directives/directives.module";

import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { EmployeeCreateContainerComponent } from "./employee-create-container/employee-create-container.component";
import { EmployeeBasicDetailsCreateComponent } from "./employee-basic-details/employee-basic-details-create/employee-basic-details-create.component";
import { EmployeeJobDetailsCreateComponent } from "./employee-job-details/employee-job-details-create/employee-job-details-create.component";
import { EmployeeJobFilingCreateComponent } from "./employee-job-filing/employee-job-filing-create/employee-job-filing-create.component";

import { EmployeeEditContainerComponent } from "./employee-edit-container/employee-edit-container.component";
import { EmployeeBasicDetailsEditComponent } from "./employee-basic-details/employee-basic-details-edit/employee-basic-details-edit.component";
import { EmployeeJobDetailsEditComponent } from "./employee-job-details/employee-job-details-edit/employee-job-details-edit.component";
import { EmployeeJobFilingEditComponent } from "./employee-job-filing/employee-job-filing-edit/employee-job-filing-edit.component";



import { EmployeeBonusListComponent } from './employee-bonus/employee-bonus-list/employee-bonus-list.component';
import { EmployeeBonusCreateComponent } from './employee-bonus/employee-bonus-create/employee-bonus-create.component';
import { EmployeeBonusEditComponent } from './employee-bonus/employee-bonus-edit/employee-bonus-edit.component';
import { EmployeeBonusViewComponent } from './employee-bonus/employee-bonus-view/employee-bonus-view.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeWpsDetailsComponent } from './employee-wps/employee-wps-details/employee-wps-details.component';
import { EmployeeBasicDetailsViewComponent } from './employee-basic-details/employee-basic-details-view/employee-basic-details-view.component';
import { EmployeeViewContainerComponent } from './employee-view-container/employee-view-container.component';
import { EmployeeWpsViewComponent } from './employee-wps/employee-wps-view/employee-wps-view.component';
import { EmployeeJobDetailsViewComponent } from './employee-job-details/employee-job-details-view/employee-job-details-view.component';
import { EmployeeJobFilingViewComponent } from './employee-job-filing/employee-job-filing-view/employee-job-filing-view.component';
import { EmployeeSalaryViewContainerComponent } from './employee-salary-view-container/employee-salary-view-container.component';
import { EmployeeAddressEditComponent } from './employee-address-edit/employee-address-edit.component';
import { EmployeeAddressViewComponent } from './employee-address-view/employee-address-view.component';
import { EmployeeSalaryContainerComponent } from "./employee-salary-container/employee-salary-container.component";
import { EmployeeSalaryCreateContainerComponent } from "./employee-salary/employee-salary-create-container/employee-salary-create-container.component";
import { EmployeeSalaryEditContainerComponent } from "./employee-salary/employee-salary-edit-container/employee-salary-edit-container.component";
import { EmployeeSalaryViewComponent } from "./employee-salary/employee-salary-view/employee-salary-view.component";
import { EmployeeSalaryFormComponent } from "./employee-salary/employee-salary-form/employee-salary-form.component";
import { EmployeeSalaryConfirmComponent } from "./employee-salary/employee-salary-confirm/employee-salary-confirm.component";
import { SharedModule } from "@shared/shared.module";
import { SelectDropDownModule } from "ngx-select-dropdown";
import { EmployeeTicketListComponent } from './employee-ticket-details/employee-ticket-list/employee-ticket-list.component';
import { EmployeeTicketCreateComponent } from './employee-ticket-details/employee-ticket-create/employee-ticket-create.component';
import { EmployeeTicketEditComponent } from './employee-ticket-details/employee-ticket-edit/employee-ticket-edit.component';
import { EmployeeTicketViewComponent } from './employee-ticket-details/employee-ticket-view/employee-ticket-view.component';

@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeCreateContainerComponent,
    EmployeeBasicDetailsCreateComponent,
    EmployeeJobDetailsCreateComponent,
    EmployeeJobFilingCreateComponent,
    EmployeeEditContainerComponent,
    EmployeeBasicDetailsEditComponent,
    EmployeeJobDetailsEditComponent,
    EmployeeJobFilingEditComponent,
    EmployeeSalaryContainerComponent,
    EmployeeSalaryCreateContainerComponent,
    EmployeeSalaryEditContainerComponent,
    EmployeeSalaryViewComponent,
    EmployeeBonusListComponent,
    EmployeeBonusCreateComponent,
    EmployeeBonusEditComponent,
    EmployeeBonusViewComponent,
    EmployeeSalaryFormComponent,
    EmployeeSalaryConfirmComponent,
    EmployeeWpsDetailsComponent,
    EmployeeBasicDetailsViewComponent,
    EmployeeViewContainerComponent,
    EmployeeWpsViewComponent,
    EmployeeJobDetailsViewComponent,
    EmployeeJobFilingViewComponent,
    EmployeeSalaryViewContainerComponent,
    EmployeeAddressEditComponent,
    EmployeeAddressViewComponent,
    EmployeeTicketListComponent,
    EmployeeTicketCreateComponent,
    EmployeeTicketEditComponent,
    EmployeeTicketViewComponent
  ],
  imports: [   
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: EmployeeListComponent,
        data: {
          breadcrumbs: ["Organization", "Employee"],
          name: "organization-employeedirectory ",
        },
      },
      {
        path: "create",
        component: EmployeeCreateContainerComponent,
        data: {
          breadcrumbs: ["Organization", "Employee", "Add"],
          name: "organization-employeedirectory ",
        },
      },
      {
        path: ":id/edit/:jobDetailsId/:jobFilingId",
        component: EmployeeEditContainerComponent,
        data: {
          breadcrumbs: ["Organization", "Employee", "Edit"],
          name: "organization-employeedirectory ",
        },
      },
      {
        path: ":id/edit/:jobDetailsId/:jobFilingId/salary-details/create",
        component: EmployeeSalaryCreateContainerComponent,
        data: {
          breadcrumbs: ["Organization", "Employee", "Salary", "Create"],
          name: "organization-employeedirectory ",
        },
      },
      {
        path: ":id/edit/:jobDetailsId/:jobFilingId/salary-details/edit",
        component: EmployeeSalaryEditContainerComponent,
        data: {
          breadcrumbs: ["Organization", "Employee", "Salary", "Edit"],
          name: "organization-employeedirectory ",
        },
      },
      {
        path: ":id/view/:jobDetailsId/:jobFilingId",
        component: EmployeeViewContainerComponent,
        data: {
          breadcrumbs: ["Organization", "Employee", "View"],
          name: "organization-employeedirectory ",
        },
      },
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    SharedModule,
    SelectDropDownModule
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
  ],
  entryComponents: [],
})
export class EmployeeModule {}










