import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateAccrualsListComponent } from './generate-accruals-list/generate-accruals-list.component';
import { GenerateAccrualsFinanceEntryComponent } from './generate-accruals-finance-entry/generate-accruals-finance-entry.component';
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


@NgModule({
  declarations: [GenerateAccrualsListComponent, GenerateAccrualsFinanceEntryComponent],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    DirectivesModule,
    SharedModule,
    SelectDropDownModule,
    ReportViewerModule,
    RouterModule.forChild([
      {
        path: '',
        component: GenerateAccrualsListComponent,
        data: {  breadcrumbs: ["Organization", "Generate Accruals"], 
        name: 'organization-generate-accruals' }
      },
      {
        path: ":id/:IorV/:payrollid/generate",
        component: GenerateAccrualsFinanceEntryComponent,
        data: {
          breadcrumbs: ["Organization", "Generate Accruals", "Generate"],
          name: 'organization-generate-accruals'
        },
      },
     
      
      
    ]),
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
]
})
export class GenerateAccrualsModule { }
