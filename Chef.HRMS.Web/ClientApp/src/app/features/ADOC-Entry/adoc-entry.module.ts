
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipesModule } from '../../pipes/pipes.module';
import { customErrorMessages } from '@shared/utils/utils.functions';
import { AdocEntryRoutingModule } from './adoc-entry-routing.module';
import { AdocEntryListComponent } from './adoc-entry-list/adoc-entry-list.component';
import { AdocEntryCreateComponent } from './adoc-entry-create/adoc-entry-create.component';
import { AdocEntryEditComponent } from './adoc-entry-edit/adoc-entry-edit.component';
import { AdocEntryViewComponent } from './adoc-entry-view/adoc-entry-view.component';
import { SelectDropDownModule } from "ngx-select-dropdown";

@NgModule({
  declarations: [
AdocEntryListComponent,
AdocEntryCreateComponent,
AdocEntryEditComponent,
AdocEntryViewComponent

  ],
  imports: [
    CommonModule,
    AdocEntryRoutingModule,
    TabsModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    //  NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule,
    SelectDropDownModule

  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: customErrorMessages,
    multi: true
  }],

})
export class AdocEntryModule { }
