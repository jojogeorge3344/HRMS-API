import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { LeaveComponentListComponent } from './leave-component-list/leave-component-list.component';
import { LeaveComponentCreateComponent } from './leave-component-create/leave-component-create.component';
import { LeaveComponentEditComponent } from './leave-component-edit/leave-component-edit.component';
import {CUSTOM_ERRORS} from '@shared/utils/validators.messages';



@NgModule({
  declarations: [
    LeaveComponentListComponent,
    LeaveComponentCreateComponent, 
    LeaveComponentEditComponent 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: LeaveComponentListComponent,
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Component'], name: 'settings-leave' }
      },
      {
        path: '', 
        component: LeaveComponentListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Component'], name: 'settings-leave'  }
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
export class LeaveComponentModule { }
