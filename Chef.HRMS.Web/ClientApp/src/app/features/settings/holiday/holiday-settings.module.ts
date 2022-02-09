import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';


import { HolidayCategoryListComponent } from './holiday-category-list/holiday-category-list.component';
import { HolidayCategoryCreateComponent } from './holiday-category-create/holiday-category-create.component';
import { HolidayCategoryEditComponent } from './holiday-category-edit/holiday-category-edit.component';

import { HolidayCreateComponent } from './holiday-create/holiday-create.component';
import { HolidayEditComponent } from './holiday-edit/holiday-edit.component';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';


@NgModule({
  declarations: [
    HolidayCategoryListComponent, 
    HolidayCategoryCreateComponent, 
    HolidayCategoryEditComponent, 
    HolidayCreateComponent, 
    HolidayEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { 
        path: '', 
        component: HolidayCategoryListComponent,
        data: { breadcrumbs: ['Settings', 'Holiday'], name: 'settings-holiday' }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule    
  ], providers: [
    DatePipe,{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    
    multi: true
  }],
})
export class HolidaySettingsModule { }
