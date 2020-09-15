import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PipesModule } from '../../pipes/pipes.module';
import { customErrorMessages } from '@shared/utils/utils.functions';

import { ReportsRoutingModule } from './reports-routing.module';
import { EmployeeListReportComponent } from './employee-list-report/employee-list-report/employee-list-report.component';
import { EmployeeBasicComponentReportComponent } from './employee-basic-component-report/employee-basic-component-report/employee-basic-component-report.component';
import { ProcessedSalaryReportComponent } from './processed-salary-report/processed-salary-report/processed-salary-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report/attendance-report.component';
import { LeaveReportComponent } from './leave-report/leave-report/leave-report.component';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { NumberToWordsPipe } from 'src/app/pipes/number-to-words.pipe';

@NgModule({
  declarations: [
    EmployeeListReportComponent,
    EmployeeBasicComponentReportComponent,
    ProcessedSalaryReportComponent,
    AttendanceReportComponent,
    LeaveReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    TabsModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule
  ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: customErrorMessages,
    multi: true
  },
  SplitByUpperCasePipe,
  NumberToWordsPipe,
  DatePipe,
  DecimalPipe],
 
  entryComponents: [
  ]
})
export class ReportsModule { }
