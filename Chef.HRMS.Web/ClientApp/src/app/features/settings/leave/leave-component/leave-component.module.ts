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
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { LeaveComponentViewComponent } from './leave-component-view/leave-component-view.component';
import { LeaveSlabCreateComponent } from './leave-slab-create/leave-slab-create.component';
import { LeaveSlabEditComponent } from './leave-slab-edit/leave-slab-edit.component';
import { LeaveSlabViewComponent } from './leave-slab-view/leave-slab-view.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    LeaveComponentListComponent,
    LeaveComponentCreateComponent,
    LeaveComponentEditComponent,
    LeaveComponentViewComponent,
    LeaveSlabCreateComponent,
    LeaveSlabEditComponent,
    LeaveSlabViewComponent
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
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Component'], name: 'settings-leave' }
      }
    ]),

    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    NgMultiSelectDropDownModule,
    DropdownModule
  ],

  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class LeaveComponentModule { }
