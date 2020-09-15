import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { WorkFromHomeSettingsCreateComponent } from './work-from-home-settings-create/work-from-home-settings-create.component';
import { WorkFromHomeSettingsEditComponent } from './work-from-home-settings-edit/work-from-home-settings-edit.component';
import { WorkFromHomeSettingsViewComponent } from './work-from-home-settings-view/work-from-home-settings-view.component';


@NgModule({
  declarations: [
    WorkFromHomeSettingsCreateComponent,
    WorkFromHomeSettingsEditComponent,
    WorkFromHomeSettingsViewComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    RouterModule.forChild([
      { path: '', 
        component: WorkFromHomeSettingsEditComponent,
        data: { breadcrumbs: ['Settings', 'Attendance', 'Work From Home Settings'], name: 'settings-attendance' } 
      },
      {
        path: '', 
        component: WorkFromHomeSettingsEditComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Attendance', 'Work From Home Settings'], name: 'settings-attendance' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    DirectivesModule 
  ]
})
export class WorkFromHomeSettingsModule { }
