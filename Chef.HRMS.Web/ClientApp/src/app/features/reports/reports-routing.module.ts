import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListReportComponent } from './employee-list-report/employee-list-report/employee-list-report.component';
import { EmployeeBasicComponentReportComponent } from './employee-basic-component-report/employee-basic-component-report/employee-basic-component-report.component';
import { ProcessedSalaryReportComponent } from './processed-salary-report/processed-salary-report/processed-salary-report.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report/attendance-report.component';
import { LeaveReportComponent } from './leave-report/leave-report/leave-report.component';
import { EmployeePayslipPrintFilterComponent } from './employee-payslip-report/employee-payslip-print-filter/employee-payslip-print-filter.component';


const routes: Routes = [
  {
    path: 'employeepayslip', component: EmployeePayslipPrintFilterComponent,
    data: { breadcrumbs: ['Employee Report List', 'Employee Payslip'], name: 'report-employeelist' }
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
