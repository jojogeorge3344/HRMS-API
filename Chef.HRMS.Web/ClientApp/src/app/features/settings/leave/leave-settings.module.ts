import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LeaveSettingsRoutingModule } from './leave-settings-routing.module';
import { LeaveSettingsContainerComponent } from "./leave-settings-container/leave-settings-container.component";
import { NgbNavModule, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    LeaveSettingsContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    LeaveSettingsRoutingModule,
    NgbNavModule
  ]
})
export class LeaveSettingsModule { }
