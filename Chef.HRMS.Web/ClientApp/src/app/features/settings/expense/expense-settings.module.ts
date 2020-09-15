import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseSettingsRoutingModule } from './expense-settings-routing.module';
import { ExpenseSettingsContainerComponent } from './expense-settings-container/expense-settings-container.component';


@NgModule({
  declarations: [
    ExpenseSettingsContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ExpenseSettingsRoutingModule
  ]
})
export class ExpenseSettingsModule { }
