import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayrollCalendarListComponent } from './payroll-calendar-list/payroll-calendar-list.component';
import { PayrollCalendarCreateComponent } from './payroll-calendar-create/payroll-calendar-create.component';
import { PayrollCalendarEditComponent } from './payroll-calendar-edit/payroll-calendar-edit.component';
import {CUSTOM_ERRORS} from '@shared/utils/validators.messages';




@NgModule({
  declarations: [
    PayrollCalendarListComponent, 
    PayrollCalendarCreateComponent, 
    PayrollCalendarEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayrollCalendarListComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Calendar'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: PayrollCalendarListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Calendar'], name: 'settings-overtime' }
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
export class PayrollCalendarModule { }
