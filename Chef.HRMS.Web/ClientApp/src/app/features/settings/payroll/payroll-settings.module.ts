import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PayrollSettingsRoutingModule } from './payroll-settings-routing.module';
import { PayrollSettingsContainerComponent } from "./payroll-settings-container/payroll-settings-container.component";

@NgModule({
  declarations: [
    PayrollSettingsContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    PayrollSettingsRoutingModule
  ]
})
export class PayrollSettingsModule { }
