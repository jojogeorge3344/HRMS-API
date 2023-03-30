import { NgModule } from '@angular/core';
import { CommonModule , DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { EmployeeDocumentsContainerComponent } from './employee-documents-container/employee-documents-container.component';

import { EmployeeEducationalDocumentsListComponent } from './employee-educational-documents/employee-educational-documents-list/employee-educational-documents-list.component';
import { EmployeeEducationalDocumentsCreateComponent } from './employee-educational-documents/employee-educational-documents-create/employee-educational-documents-create.component';
import { EmployeeEducationalDocumentsEditComponent } from './employee-educational-documents/employee-educational-documents-edit/employee-educational-documents-edit.component';

import { EmployeeExperienceDocumentsListComponent } from './employee-experience-documents/employee-experience-documents-list/employee-experience-documents-list.component';
import { EmployeeExperienceDocumentsCreateComponent } from './employee-experience-documents/employee-experience-documents-create/employee-experience-documents-create.component';
import { EmployeeExperienceDocumentsEditComponent } from './employee-experience-documents/employee-experience-documents-edit/employee-experience-documents-edit.component';

import { EmployeeIdentityDocumentsContainerComponent } from './employee-identity-documents-container/employee-identity-documents-container.component';

import { EmployeeDrivingLicenseCreateComponent } from './employee-driving-license/employee-driving-license-create/employee-driving-license-create.component';
import { EmployeeDrivingLicenseEditComponent } from './employee-driving-license/employee-driving-license-edit/employee-driving-license-edit.component';
import { EmployeeDrivingLicenseActionsComponent } from './employee-driving-license/employee-driving-license-actions/employee-driving-license-actions.component';
import { EmployeeDrivingLicenseViewComponent } from './employee-driving-license/employee-driving-license-view/employee-driving-license-view.component';

import { EmployeePANCardCreateComponent } from './employee-pan-card/employee-pan-card-create/employee-pan-card-create.component';
import { EmployeePANCardEditComponent } from './employee-pan-card/employee-pan-card-edit/employee-pan-card-edit.component';
import { EmployeePANCardActionsComponent } from './employee-pan-card/employee-pan-card-actions/employee-pan-card-actions.component';
import { EmployeePANCardViewComponent } from './employee-pan-card/employee-pan-card-view/employee-pan-card-view.component';

import { EmployeePassportCreateComponent } from './employee-passport/employee-passport-create/employee-passport-create.component';
import { EmployeePassportEditComponent } from './employee-passport/employee-passport-edit/employee-passport-edit.component';
import { EmployeePassportActionsComponent } from './employee-passport/employee-passport-actions/employee-passport-actions.component';
import { EmployeePassportViewComponent } from './employee-passport/employee-passport-view/employee-passport-view.component';

import { EmployeeUIDCreateComponent } from './employee-uid/employee-uid-create/employee-uid-create.component';
import { EmployeeUIDEditComponent } from './employee-uid/employee-uid-edit/employee-uid-edit.component';
import { EmployeeUIDActionsComponent } from './employee-uid/employee-uid-actions/employee-uid-actions.component';
import { EmployeeUIDViewComponent } from './employee-uid/employee-uid-view/employee-uid-view.component';

import { EmployeeBankDetailsCreateComponent } from './employee-bank-details/employee-bank-details-create/employee-bank-details-create.component';
import { EmployeeBankDetailsEditComponent } from './employee-bank-details/employee-bank-details-edit/employee-bank-details-edit.component';
import { EmployeeBankDetailsActionsComponent } from './employee-bank-details/employee-bank-details-actions/employee-bank-details-actions.component';
import { EmployeeBankDetailsViewComponent } from './employee-bank-details/employee-bank-details-view/employee-bank-details-view.component';

import { EmployeeOfficialDocumentsListComponent } from './employee-official-documents/employee-official-documents-list/employee-official-documents-list.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeIdentityDocumentsEditComponent } from './employee-identity-documents-container/employee-identity-documents-edit/employee-identity-documents-edit.component';
import { EmployeeIdentityDocumentsCreateComponent } from './employee-identity-documents-container/employee-identity-documents-create/employee-identity-documents-create.component';
import { EmployeeIdentityDetailsService } from './employee-identity-documents-container/employee-identity-details.service';
import { EmployeeIdentityDocumentsService } from './employee-identity-documents-container/employee-identity-documents.service';

@NgModule({
  declarations: [
    EmployeeDocumentsContainerComponent,
    EmployeeEducationalDocumentsListComponent,
    EmployeeEducationalDocumentsCreateComponent,
    EmployeeEducationalDocumentsEditComponent,
    EmployeeExperienceDocumentsListComponent,
    EmployeeExperienceDocumentsCreateComponent,
    EmployeeExperienceDocumentsEditComponent,
    EmployeeIdentityDocumentsContainerComponent,
    EmployeeDrivingLicenseCreateComponent,
    EmployeeDrivingLicenseEditComponent,
    EmployeeDrivingLicenseActionsComponent,
    EmployeeDrivingLicenseViewComponent,
    EmployeePANCardCreateComponent,
    EmployeePANCardEditComponent,
    EmployeePANCardActionsComponent,
    EmployeePANCardViewComponent,
    EmployeePassportCreateComponent,
    EmployeePassportEditComponent,
    EmployeePassportActionsComponent,
    EmployeePassportViewComponent,
    EmployeeUIDCreateComponent,
    EmployeeUIDEditComponent,
    EmployeeUIDActionsComponent,
    EmployeeUIDViewComponent,
    EmployeeBankDetailsCreateComponent,
    EmployeeBankDetailsEditComponent,
    EmployeeBankDetailsActionsComponent,
    EmployeeBankDetailsViewComponent,
    EmployeeOfficialDocumentsListComponent,
    EmployeeIdentityDocumentsEditComponent,
    EmployeeIdentityDocumentsCreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: EmployeeDocumentsContainerComponent,
        data: { breadcrumbs: ['Me', 'Documents'], name: 'me-mydocuments' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule
  ],
  exports:[],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true,
    
  },
  EmployeeIdentityDetailsService,
  EmployeeIdentityDocumentsService,
  DatePipe],
})
export class EmployeeDocumentsModule { }
