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

import { PayrollComponentListComponent } from "./payroll-component-list/payroll-component-list.component";
import { PayrollComponentCreateComponent } from "./payroll-component-create/payroll-component-create.component";
import { PayrollComponentEditComponent } from "./payroll-component-edit/payroll-component-edit.component";
import { CUSTOM_ERRORS } from "@shared/utils/validators.messages";
import { SelectDropDownModule } from "ngx-select-dropdown";

@NgModule({
  declarations: [
    PayrollComponentListComponent,
    PayrollComponentCreateComponent,
    PayrollComponentEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: PayrollComponentListComponent,
        data: {
          breadcrumbs: ["Settings", "Payroll", "Payroll Component"],
          name: "settings-overtime",
        },
      },
      {
        path: "",
        component: PayrollComponentListComponent,
        outlet: "tab-content",
        data: {
          breadcrumbs: ["Settings", "Payroll", "Payroll Component"],
          name: "settings-overtime",
        },
      },
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    SelectDropDownModule,
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
  ],
})
export class PayrollComponentModule {}
