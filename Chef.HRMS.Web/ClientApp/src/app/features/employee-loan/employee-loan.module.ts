import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { LoanRequestListComponent } from './loan-request-list/loan-request-list.component';
import { LoanRequestCreateComponent } from './loan-request-create/loan-request-create.component';
import { LoanRequestEditComponent } from './loan-request-edit/loan-request-edit.component';
import { LoanRequestViewComponent } from './loan-request-view/loan-request-view.component';



@NgModule({
  declarations: [
    LoanRequestListComponent,
    LoanRequestCreateComponent,
    LoanRequestEditComponent,
    LoanRequestViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: LoanRequestListComponent,
        data: { breadcrumbs: ['Me', 'Loan'], name: 'me-loan' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule
  ]
})
export class EmployeeLoanModule { }