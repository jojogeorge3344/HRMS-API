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
import {DropdownModule} from 'primeng/dropdown';
import { PayslipComponentsListComponent } from './payslip-components-list/payslip-components-list.component';
import { PayslipComponentsCreateComponent } from './payslip-components-create/payslip-components-create.component';
import { PayslipComponentsEditComponent } from './payslip-components-edit/payslip-components-edit.component';
import { PayslipComponentsViewComponent } from './payslip-components-view/payslip-components-view.component';
import { PayslipComponentsRoutingModule } from './payslip-components-routing.module';
import {MultiSelectModule} from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
@NgModule({
  declarations: [
PayslipComponentsCreateComponent,
PayslipComponentsEditComponent,
PayslipComponentsViewComponent,
PayslipComponentsListComponent
  ],
  imports: [
    CommonModule,
    PayslipComponentsRoutingModule,
    TabsModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    //  NgBootstrapFormValidationModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule,
    DropdownModule,
    MultiSelectModule,
    RadioButtonModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: customErrorMessages,
    multi: true
  }],

})
export class PayslipComponentsModule { }
