import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { EmployeeAttendanceContainerComponent } from './employee-attendance-container/employee-attendance-container.component';
import { EmployeeAttendanceStatsComponent } from './employee-attendance-stats/employee-attendance-stats.component';
import { EmployeeAttendanceActionsComponent } from './employee-attendance-actions/employee-attendance-actions.component';
import { EmployeeAttendanceLogComponent } from './employee-attendance-log/employee-attendance-log.component';
import { EmployeeRequestsContainerComponent } from './employee-requests-container/employee-requests-container.component';

import { EmployeeWebLoginCreateComponent } from './employee-regular-login/employee-web-login-create/employee-web-login-create.component';
import { EmployeeRemoteLoginCreateComponent } from './employee-regular-login/employee-remote-login-create/employee-remote-login-create.component';
import { EmployeeOnDutyListComponent } from './employee-on-duty/employee-on-duty-list/employee-on-duty-list.component';
import { EmployeeOnDutyCreateComponent } from './employee-on-duty/employee-on-duty-create/employee-on-duty-create.component';
import { EmployeeWFHListComponent } from './employee-wfh/employee-wfh-list/employee-wfh-list.component';
import { EmployeeWFHCreateComponent } from './employee-wfh/employee-wfh-create/employee-wfh-create.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EmployeeAttendanceCalendarComponent } from './employee-attendance-calendar/employee-attendance-calendar.component';
import { EmployeeAttendanceBulkUploadComponent } from './employee-attendance-bulk-upload/employee-attendance-bulk-upload.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  // interactionPlugin
]);

@NgModule({
  declarations: [
    EmployeeAttendanceContainerComponent,
    EmployeeAttendanceStatsComponent,
    EmployeeAttendanceActionsComponent,
    EmployeeAttendanceLogComponent,
    EmployeeRequestsContainerComponent,
    EmployeeWebLoginCreateComponent,
    EmployeeRemoteLoginCreateComponent,
    EmployeeOnDutyListComponent,
    EmployeeOnDutyCreateComponent,
    EmployeeWFHListComponent,
    EmployeeWFHCreateComponent,
    EmployeeAttendanceCalendarComponent,
    EmployeeAttendanceBulkUploadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: EmployeeAttendanceContainerComponent,
        data: { breadcrumbs: ['Me', 'Attendance'], name: 'me-attendance' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    DirectivesModule,
    FullCalendarModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
})
export class EmployeeAttendanceModule { }
