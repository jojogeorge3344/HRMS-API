import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import{BankEmployeeCreateComponent} from '../bank/bank-employee-create/bank-employee-create.component';
import{BankEmployeeEditComponent} from '../bank/bank-employee-edit/bank-employee-edit.component';
import{BankEmployeeListComponent} from '../bank/bank-employee-list/bank-employee-list.component';

@NgModule({
  declarations: [
    BankEmployeeCreateComponent,
    BankEmployeeEditComponent,
    BankEmployeeListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BankEmployeeListComponent,
        data: { breadcrumbs: ['Settings', 'Bank', 'List'], name: 'settings-expense' }
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
    BankEmployeeCreateComponent,
    BankEmployeeEditComponent,
  ]
})
export class BankModule { }
