import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { OvertimePolicyConfigurationCreateComponent } from './overtime-policy-configuration-create/overtime-policy-configuration-create.component';
import { OvertimePolicyConfigurationEditComponent } from './overtime-policy-configuration-edit/overtime-policy-configuration-edit.component';
import { OvertimePolicyCalculationComponent } from './overtime-policy-calculation/overtime-policy-calculation.component';



@NgModule({
  declarations: [    
    OvertimePolicyConfigurationCreateComponent,
    OvertimePolicyConfigurationEditComponent,
    OvertimePolicyCalculationComponent
  ],    
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgBootstrapFormValidationModule,
    PipesModule,
    RouterModule.forChild([
      {
        path: ':overtimePolicyId/create', component: OvertimePolicyConfigurationCreateComponent,
        data: { breadcrumbs: ['Settings', 'Overtime Policy', 'Configuration'],  name: 'settings-overtime' }
      },
      {
        path: ':overtimePolicyId/edit', component: OvertimePolicyConfigurationEditComponent,
        data: { breadcrumbs: ['Settings', 'Overtime Policy', 'Configuration'],  name: 'settings-overtime' }
      }
    ]),
  ],
  entryComponents: [
    OvertimePolicyCalculationComponent
  ]
})
export class OvertimePolicyConfigurationModule { }
