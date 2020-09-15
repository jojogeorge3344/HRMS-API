import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeSettingsRoutingModule } from './employee-settings-routing.module';
import { EmployeeSettingsContainerComponent } from './employee-settings-container/employee-settings-container.component';


@NgModule({
  declarations: [
    EmployeeSettingsContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    EmployeeSettingsRoutingModule
  ]
})
export class EmployeeSettingsModule { }
