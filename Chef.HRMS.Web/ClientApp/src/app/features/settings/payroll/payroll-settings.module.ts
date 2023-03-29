import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PayrollSettingsRoutingModule } from './payroll-settings-routing.module';
import { PayrollSettingsContainerComponent } from "./payroll-settings-container/payroll-settings-container.component";
import { SystemVariableComponent } from './system-variable/system-variable.component';


@NgModule({
  declarations: [
    PayrollSettingsContainerComponent,
    SystemVariableComponent,

  ],
  imports: [
    CommonModule,
    NgbModule,
    PayrollSettingsRoutingModule
  ]
})
export class PayrollSettingsModule { }
