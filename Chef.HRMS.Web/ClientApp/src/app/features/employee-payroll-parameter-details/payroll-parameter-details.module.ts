import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { PayrollParameterDetailsCreateComponent } from './payroll-parameter-details-create/payroll-parameter-details-create.component';
import { PayrollParameterDetailsEditComponent } from './payroll-parameter-details-edit/payroll-parameter-details-edit.component';
import { PayrollParameterDetailsListComponent } from './payroll-parameter-details-list/payroll-parameter-details-list.component';
import { PayrollParameterDetailsViewComponent } from './payroll-parameter-details-view/payroll-parameter-details-view.component';
import { SelectDropDownModule } from "ngx-select-dropdown";

@NgModule({
  declarations: [
    PayrollParameterDetailsCreateComponent,
    PayrollParameterDetailsEditComponent,
    PayrollParameterDetailsViewComponent,
    PayrollParameterDetailsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PayrollParameterDetailsListComponent,
        data: { breadcrumbs: ['Settings', 'Document Type', 'List'], name: 'settings-expense' }
      },
      {
        path: "create",
        component: PayrollParameterDetailsCreateComponent,
        data: {
          breadcrumbs: ["Organization", "Employee payroll parameter details", "Add"],
          name: "organization-employeePayrollParameterDetails ",
        },
      },
      {
        path: ":id/edit",
        component: PayrollParameterDetailsEditComponent,
        data: {
          breadcrumbs: ["Organization", "Employee payroll parameter details", "edit"],
          name: "organization-employeePayrollParameterDetails ",
        },
      },
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    SelectDropDownModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  entryComponents: [
    PayrollParameterDetailsCreateComponent,
    PayrollParameterDetailsEditComponent,
  ]
})
export class PayrollParameterDetailsModule { }

