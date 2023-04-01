import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { DocumentTypeCreateComponent } from './document-type-create/document-type-create.component';
import { DocumentTypeEditComponent } from './document-type-edit/document-type-edit.component';
import { DocumentTypeListComponent } from './document-type-list/document-type-list.component';
import { DocumentTypeViewComponent } from './document-type-view/document-type-view.component';


@NgModule({
  declarations: [
    DocumentTypeCreateComponent,
    DocumentTypeEditComponent,
    DocumentTypeListComponent,
    DocumentTypeViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DocumentTypeListComponent,
        data: { breadcrumbs: ['Settings', 'Document Type', 'List'], name: 'settings-expense' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule
    ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  entryComponents: [
    DocumentTypeCreateComponent,
    DocumentTypeEditComponent
  ]
})
export class DocumentTypeModule { }

