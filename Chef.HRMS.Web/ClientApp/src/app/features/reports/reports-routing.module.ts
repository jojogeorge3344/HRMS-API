import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListReportComponent } from './employee-list-report/employee-list-report/employee-list-report.component';
import { EmployeeBasicComponentReportComponent } from './employee-basic-component-report/employee-basic-component-report/employee-basic-component-report.component';
import { ProcessedSalaryReportComponent } from './processed-salary-report/processed-salary-report/processed-salary-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report/attendance-report.component';
import { LeaveReportComponent } from './leave-report/leave-report/leave-report.component';
import { EmployeePayslipPrintFilterComponent } from './employee-payslip-report/employee-payslip-print-filter/employee-payslip-print-filter.component';
import { EmployeePayslipPrintComponent } from './employee-payslip-report/employee-payslip-print/employee-payslip-print.component';
import { EmployeePayrollReportFilterComponent } from './employee-payroll-report/employee-payroll-report-filter/employee-payroll-report-filter.component';
import { LeaveDetailsReportFilterComponent } from './leave-details-report/leave-details-report-filter/leave-details-report-filter.component';
import { LeaveDetailsPrintComponent } from './leave-details-report/leave-details-print/leave-details-print.component';
import { EmployeeOvertimeReportComponent } from './employee-overtime/employee-overtime-report/employee-overtime-report.component';
import { EmployeeOvertimeReportPrintComponent } from './employee-overtime/employee-overtime-report-print/employee-overtime-report-print.component';


const routes: Routes = [
  {
    path: 'employeepayslip', component: EmployeePayslipPrintFilterComponent,
    data: { breadcrumbs: ['Employee Report List', 'Employee Payslip'], name: 'report-employeelist' }
  },
  {
    path: 'employeepayroll', component: EmployeePayrollReportFilterComponent,
    data: { breadcrumbs: ['Employee Report List', 'Employee Payroll'], name: 'report-employeelist' }
  },
  {
    path: 'leavedetails', component: LeaveDetailsReportFilterComponent,
    data: { breadcrumbs: ['Employee Report List', 'Employee leave details'], name: 'report-employeelist' }
  },
  {
    path: 'leavedetails/print', component: LeaveDetailsPrintComponent,
    data: { breadcrumbs: ['Employee Report List', 'LeaveDetailsPrintComponent'],  name: 'report-employeelist' }
    
  },
  {
    path: 'employeeList', component: EmployeeListReportComponent,
    data: { breadcrumbs: ['Employee Report List', 'EmployeeList'], name: 'report-employeelist' }
  },
  {
    path: 'basicList', component: EmployeeBasicComponentReportComponent,
    data: { breadcrumbs: ['Employee Basic Component Report List', 'EmployeeBasicComponent'], name: 'report-employeebasiccomponentbreakup' }
  },
  {
    path: 'processedsalarylist', component: ProcessedSalaryReportComponent,
    data: { breadcrumbs: ['Processed Salary Report List', 'ProcessedSalaryReportComponent'], name: 'report-processedsalary' }
  },
  {
    path: 'attendancelist', component: AttendanceReportComponent,
    data: { breadcrumbs: ['Attendance Report List', 'AttendanceReportComponent'], name: 'report-attendancereport' }
  },
  {
    path: 'leavelist', component: LeaveReportComponent,
    data: { breadcrumbs: ['Leave Report List', 'LeaveReportComponent'], name: 'report-leavereport' }
  },
  
  // {
  //   path: 'print', component: EmployeePayslipPrintComponent,
  //   data: { breadcrumbs: ['Me', 'Leave'], name: 'me-leave' }
  // }
  {
    path: 'employeeovertimelist', component: EmployeeOvertimeReportComponent,
    data: { breadcrumbs: ['Employee Overtime Report List', 'EmployeeOvertimeReportComponent'], name: 'report-overtimereport' }
  },
  {
    path: 'employeeovertimelist/print', component: EmployeeOvertimeReportPrintComponent,
    data: { breadcrumbs: ['Employee Overtime Report List', 'EmployeeOvertimeReportPrintComponent'], name: 'report-overtimereport' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
