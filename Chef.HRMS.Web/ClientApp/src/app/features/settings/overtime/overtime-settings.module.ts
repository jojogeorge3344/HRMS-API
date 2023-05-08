import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OvertimeSettingsRoutingModule } from './overtime-settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OvertimeSlabCreateComponent } from './overtime-slab/overtime-slab-create/overtime-slab-create.component';
import { OvertimeSlabEditComponent } from './overtime-slab/overtime-slab-edit/overtime-slab-edit.component';
import { OvertimeSlabViewComponent } from './overtime-slab/overtime-slab-view/overtime-slab-view.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';


@NgModule({
  declarations: [OvertimeSlabCreateComponent, OvertimeSlabEditComponent, OvertimeSlabViewComponent],
  imports: [
    CommonModule,
    OvertimeSettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgBootstrapFormValidationModule.forRoot()
  ]
})
export class OvertimeSettingsModule { }
