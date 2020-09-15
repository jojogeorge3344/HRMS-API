import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { LeaveConfigurationContainerComponent } from './leave-configuration-container/leave-configuration-container.component';
import { LeaveConfigurationEditComponent } from './leave-configuration-edit/leave-configuration-edit.component';
import { LeaveConfigurationGeneralComponent } from './leave-configuration-general/leave-configuration-general.component';
import { LeaveConfigurationRestrictionsComponent } from './leave-configuration-restrictions/leave-configuration-restrictions.component';


@NgModule({
  declarations: [
    LeaveConfigurationContainerComponent, 
    LeaveConfigurationEditComponent, 
    LeaveConfigurationGeneralComponent, 
    LeaveConfigurationRestrictionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', 
        component: LeaveConfigurationContainerComponent,
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Configuration'], name: 'settings-leave'  }
      },
      {
        path: ':leaveComponentId/edit', 
        component: LeaveConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Configuration'], name: 'settings-leave'  }
      },
      {
        path: ':leaveComponentId/view', 
        component: LeaveConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Leave', 'Leave Configuration'], name: 'settings-leave'  }
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
export class LeaveConfigurationModule { }