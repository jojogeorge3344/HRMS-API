import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayrollStructureListComponent } from './payroll-structure-list/payroll-structure-list.component';
import { PayrollStructureCreateComponent } from './payroll-structure-create/payroll-structure-create.component';
import { PayrollStructureEditComponent } from './payroll-structure-edit/payroll-structure-edit.component';
import { PayrollStructureViewComponent } from './payroll-structure-view/payroll-structure-view.component';
import { PayrollStructureAssignComponent } from './payroll-structure-assign/payroll-structure-assign.component';
import {CUSTOM_ERRORS} from '@shared/utils/validators.messages';



@NgModule({
  declarations: [
    PayrollStructureListComponent, 
    PayrollStructureCreateComponent, 
    PayrollStructureEditComponent, 
    PayrollStructureViewComponent,
    PayrollStructureAssignComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayrollStructureListComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Structure'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: PayrollStructureListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'Payroll Structure'], name: 'settings-overtime' }
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
export class PayrollStructureModule { }
