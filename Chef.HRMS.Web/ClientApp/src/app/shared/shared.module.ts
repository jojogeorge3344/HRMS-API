import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { DialogsModule } from "./dialogs/dialogs.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  NgBootstrapFormValidationModule,
  CUSTOM_ERROR_MESSAGES,
} from "ng-bootstrap-form-validation";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { DirectivesModule } from "src/app/directives/directives.module";
import { CUSTOM_ERRORS } from "@shared/utils/validators.messages";

import { DocumentViewModalComponent } from "./document-view-modal/document-view-modal.component";

import { EmployeeDocumentsContainerComponent } from "./employee-document-section/employee-documents-container/employee-documents-container.component";

import { EmployeeIdentityDocumentsListComponent } from "./employee-document-section/employee-identity-documents/employee-identity-documents-list/employee-identity-documents-list.component";
import { EmployeeIdentityDocumentsCreateComponent } from "./employee-document-section/employee-identity-documents/employee-identity-documents-create/employee-identity-documents-create.component";
import { EmployeeIdentityDocumentsEditComponent } from "./employee-document-section/employee-identity-documents/employee-identity-documents-edit/employee-identity-documents-edit.component";
import { EmployeeIdentityDocumentsViewComponent } from "./employee-document-section/employee-identity-documents/employee-identity-documents-view/employee-identity-documents-view.component";

import { EmployeeEducationalDocumentsListComponent } from "./employee-document-section/employee-educational-documents/employee-educational-documents-list/employee-educational-documents-list.component";
import { EmployeeEducationalDocumentsCreateComponent } from "./employee-document-section/employee-educational-documents/employee-educational-documents-create/employee-educational-documents-create.component";
import { EmployeeEducationalDocumentsEditComponent } from "./employee-document-section/employee-educational-documents/employee-educational-documents-edit/employee-educational-documents-edit.component";
import { EmployeeEducationalDocumentsViewComponent } from "./employee-document-section/employee-educational-documents/employee-educational-documents-view/employee-educational-documents-view.component";

import { EmployeeExperienceDocumentsListComponent } from "./employee-document-section/employee-experience-documents/employee-experience-documents-list/employee-experience-documents-list.component";
import { EmployeeExperienceDocumentsCreateComponent } from "./employee-document-section/employee-experience-documents/employee-experience-documents-create/employee-experience-documents-create.component";
import { EmployeeExperienceDocumentsEditComponent } from "./employee-document-section/employee-experience-documents/employee-experience-documents-edit/employee-experience-documents-edit.component";
import { EmployeeExperienceDocumentsViewComponent } from "./employee-document-section/employee-experience-documents/employee-experience-documents-view/employee-experience-documents-view.component";

import { EmployeeOfficialDocumentsListComponent } from "./employee-document-section/employee-official-documents/employee-official-documents-list/employee-official-documents-list.component";
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [
    DocumentViewModalComponent,
    EmployeeDocumentsContainerComponent,
    EmployeeEducationalDocumentsListComponent,
    EmployeeEducationalDocumentsCreateComponent,
    EmployeeEducationalDocumentsEditComponent,
    EmployeeExperienceDocumentsListComponent,
    EmployeeExperienceDocumentsCreateComponent,
    EmployeeExperienceDocumentsEditComponent,
    EmployeeIdentityDocumentsListComponent,
    EmployeeIdentityDocumentsCreateComponent,
    EmployeeIdentityDocumentsEditComponent,
    EmployeeOfficialDocumentsListComponent,
    EmployeeIdentityDocumentsViewComponent,
    EmployeeExperienceDocumentsViewComponent,
    EmployeeEducationalDocumentsViewComponent,
  ],
  imports: [
    CommonModule,
    DialogsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule,
    DropdownModule
  ],
  exports: [
    EmployeeDocumentsContainerComponent,
    EmployeeEducationalDocumentsListComponent,
    EmployeeEducationalDocumentsCreateComponent,
    EmployeeEducationalDocumentsEditComponent,
    EmployeeExperienceDocumentsListComponent,
    EmployeeExperienceDocumentsCreateComponent,
    EmployeeExperienceDocumentsEditComponent,
    EmployeeIdentityDocumentsListComponent,
    EmployeeIdentityDocumentsCreateComponent,
    EmployeeIdentityDocumentsEditComponent,
    EmployeeOfficialDocumentsListComponent,
  ],
  providers: [
    {
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true,
    },
    DatePipe,
  ],
})
export class SharedModule {}
