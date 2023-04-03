import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OvertimeSettingsRoutingModule } from './overtime-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OvertimeSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OvertimeSettingsModule { }
