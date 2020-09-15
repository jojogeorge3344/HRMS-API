import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { NotificationPendingComponent } from './notification-pending/notification-pending.component';
import { LeaveRequestViewComponent } from './leave-request-view/leave-request-view.component';


@NgModule({
  declarations: [
    NotificationPendingComponent,
    LeaveRequestViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: NotificationPendingComponent,
        data: { breadcrumbs: ['notifications', ], name: 'team-approvals' }
      }

    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule,
    PipesModule
  ]
})
export class NotificationsModule { }
