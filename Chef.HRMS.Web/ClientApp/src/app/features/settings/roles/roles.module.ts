import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DndModule } from 'ng2-dnd';

import { DirectivesModule } from 'src/app/directives/directives.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RolesAssigningComponent } from './roles-assigning/roles-assigning.component';




@NgModule({
  declarations: [
    RolesAssigningComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: RolesAssigningComponent,
        data: { breadcrumbs: ['Roles', 'Assigning'], name: 'settings-assignroles' }
      }

    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DndModule.forRoot(),
    DirectivesModule,
    PipesModule
  ]
})
export class RolesModule { }
