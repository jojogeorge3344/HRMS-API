import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { OvertimePolicyListComponent } from './overtime-policy-list/overtime-policy-list.component';
import { OvertimePolicyCreateComponent } from './overtime-policy-create/overtime-policy-create.component';
import { OvertimePolicyEditComponent } from './overtime-policy-edit/overtime-policy-edit.component';
import { OvertimePolicyViewComponent } from './overtime-policy-view/overtime-policy-view.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';


@NgModule({
  declarations: [
    OvertimePolicyCreateComponent,
    OvertimePolicyEditComponent,
    OvertimePolicyListComponent,
    OvertimePolicyViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: OvertimePolicyListComponent,
        data: { breadcrumbs: ['Settings', 'Overtime Policy'],  name: 'settings-overtime' }
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
})
export class OvertimePolicyModule { }
