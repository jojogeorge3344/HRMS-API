import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { TeamAttendanceContainerComponent } from './team-attendance-container/team-attendance-container.component';
import { TeamAttendanceStatsComponent } from './team-attendance-stats/team-attendance-stats.component';
import { TeamAttendanceLogComponent } from './team-attendance-log/team-attendance-log.component';
import { TeamLeaveLogComponent } from './team-leave-log/team-leave-log.component';



@NgModule({
  declarations: [TeamAttendanceContainerComponent, TeamAttendanceStatsComponent, TeamAttendanceLogComponent, TeamLeaveLogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: TeamAttendanceContainerComponent,
        data: { breadcrumbs: ['Team', 'Attendance'],  name: 'team-attendance' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule
  ]
})
export class TeamAttendanceModule { }
