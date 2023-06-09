import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { LoanSettingsCreateComponent } from './loan-settings-create/loan-settings-create.component';
import { LoanSettingsEditComponent } from './loan-settings-edit/loan-settings-edit.component';
import { LoanSettingsViewComponent } from './loan-settings-view/loan-settings-view.component';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    LoanSettingsCreateComponent,
    LoanSettingsEditComponent,
    LoanSettingsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      // { path: '', 
      //   component: LoanSettingsViewComponent,
      //   data: { breadcrumbs: ['Settings', 'Loan'] }
      // },
      // { path: 'create', 
      //   component: LoanSettingsCreateComponent,
      //   data: { breadcrumbs: ['Settings', 'Loan', 'Add'] }
      // },
      {
        path: '',
        component: LoanSettingsEditComponent,
        data: { breadcrumbs: ['Settings', 'Loan', 'Edit'], name: 'settings-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule,
    DropdownModule
  ]
})
export class LoanSettingsModule { }
