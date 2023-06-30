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
import { EmployeePayslipPrintFilterComponent } from './employee-payslip-report/employee-payslip-print-filter/employee-payslip-print-filter.component';
// import { NgSelectModule } from '@ng-select/ng-select'; 
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmployeePayslipPrintComponent } from './employee-payslip-report/employee-payslip-print/employee-payslip-print.component';
import { ReportViewerModule } from '@shared/report-viewer/report-viewer.module';
import { BoldReportViewerModule } from '@boldreports/angular-reporting-components';
import { EmployeePayrollReportFilterComponent } from './employee-payroll-report/employee-payroll-report-filter/employee-payroll-report-filter.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { LeaveDetailsReportFilterComponent } from './leave-details-report/leave-details-report-filter/leave-details-report-filter.component';
import { LeaveDetailsPrintComponent } from './leave-details-report/leave-details-print/leave-details-print.component';

 @NgModule({
  declarations: [
    EmployeeListReportComponent,
    EmployeeBasicComponentReportComponent,
    ProcessedSalaryReportComponent,
    AttendanceReportComponent,
    LeaveReportComponent,
    EmployeePayslipPrintFilterComponent,
    EmployeePayslipPrintComponent,
    EmployeePayrollReportFilterComponent,
    LeaveDetailsReportFilterComponent,
    LeaveDetailsPrintComponent
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
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule,
    ReportViewerModule,
    BoldReportViewerModule,
    NgMultiSelectDropDownModule,
    MultiSelectModule,
    
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
