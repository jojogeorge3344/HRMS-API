import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AttendanceSettingsRoutingModule } from './attendance-settings-routing.module';
import { AttendanceSettingsContainerComponent } from "./attendance-settings-container/attendance-settings-container.component";

@NgModule({
  declarations: [
    AttendanceSettingsContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AttendanceSettingsRoutingModule
    
  ]
})
export class AttendanceSettingsModule { }
