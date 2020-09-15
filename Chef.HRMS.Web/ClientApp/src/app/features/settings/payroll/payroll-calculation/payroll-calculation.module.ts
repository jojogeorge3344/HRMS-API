import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayrollCalculationListComponent } from './payroll-calculation-list/payroll-calculation-list.component';
import { PayrollCalculationEditComponent } from './payroll-calculation-edit/payroll-calculation-edit.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';



@NgModule({
  declarations: [
    PayrollCalculationListComponent, 
    PayrollCalculationEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayrollCalculationListComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Calculation'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: PayrollCalculationListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Calculation'], name: 'settings-overtime' }
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
export class PayrollCalculationModule { }
