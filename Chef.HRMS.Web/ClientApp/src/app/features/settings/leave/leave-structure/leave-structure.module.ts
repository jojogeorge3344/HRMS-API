import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { LeaveStructureListComponent } from './leave-structure-list/leave-structure-list.component';
import { LeaveStructureCreateComponent } from './leave-structure-create/leave-structure-create.component';
import { LeaveStructureEditComponent } from './leave-structure-edit/leave-structure-edit.component';
import { LeaveStructureAssignComponent } from './leave-structure-assign/leave-structure-assign.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';



@NgModule({
  declarations: [
    LeaveStructureListComponent,
    LeaveStructureCreateComponent,
    LeaveStructureEditComponent,
    LeaveStructureAssignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeaveStructureListComponent,
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Structure'], name: 'settings-leave'  }
      },
      {
        path: '',
        component: LeaveStructureListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Structure'], name: 'settings-leave'  }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule
  ], providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class LeaveStructureModule { }
