import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { ReligionListComponent } from './religion-list/religion-list.component';
import { ReligionCreateComponent } from './religion-create/religion-create.component';
import { ReligionEditComponent } from './religion-edit/religion-edit.component';


@NgModule({
  declarations: [
    ReligionListComponent,
    ReligionCreateComponent,
    ReligionEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ReligionListComponent,
        data: { breadcrumbs: ['Settings', 'Religion', 'List'], name: 'settings-expense' }
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
    ReligionCreateComponent,
    ReligionEditComponent
  ]
})
export class ReligionModule { }
