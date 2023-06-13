import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { PayGroupListComponent } from './pay-group-list/pay-group-list.component';
import { PayGroupCreateComponent } from './pay-group-create/pay-group-create.component';
import { PayGroupEditComponent } from './pay-group-edit/pay-group-edit.component';
import {CUSTOM_ERRORS} from '@shared/utils/validators.messages';
import { PayGroupViewComponent } from './pay-group-view/pay-group-view.component';
import {DropdownModule} from 'primeng/dropdown';




@NgModule({
  declarations: [
    PayGroupListComponent,
    PayGroupCreateComponent, 
    PayGroupEditComponent, PayGroupViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: PayGroupListComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'Pay Group'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: PayGroupListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'Pay Group'], name: 'settings-overtime' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    DropdownModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class PayGroupModule { }
