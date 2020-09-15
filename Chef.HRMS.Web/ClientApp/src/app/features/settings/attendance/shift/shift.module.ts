import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';

import { ShiftListComponent } from './shift-list/shift-list.component';
import { ShiftCreateComponent } from './shift-create/shift-create.component';
import { ShiftEditComponent } from './shift-edit/shift-edit.component';
import { ShiftViewComponent } from './shift-view/shift-view.component';


@NgModule({
  declarations: [
    ShiftListComponent, 
    ShiftCreateComponent, 
    ShiftEditComponent, 
    ShiftViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: ShiftListComponent,
        data: { breadcrumbs: ['Settings', 'Attendance', 'Shift Management'], name: 'settings-attendance' }
      },
      {
        path: '', 
        component: ShiftListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Attendance', 'Shift Management'], name: 'settings-attendance' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule
  ]
})
export class ShiftModule { }
