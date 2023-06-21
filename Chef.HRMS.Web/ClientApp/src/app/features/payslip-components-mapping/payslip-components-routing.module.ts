import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayslipComponentsListComponent } from './payslip-components-list/payslip-components-list.component';

const routes: Routes = [
  {
    path: '', component: PayslipComponentsListComponent,
    data: { breadcrumbs: ['organisation', 'payslip components'], name: 'settings-expense' }
  },
//   {
//     path: 'payroll-process-view', component: PayrollProcessViewComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-setup', component: PayrollProcessCreateContainerComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' },
//   },
//   {
//     path: 'payroll-process-setup/leave-attendance', component: PayrollProcessLeaveListComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-setup/salary-component', component: PayrollProcessSalaryListComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-setup/bonus', component: PayrollProcessBonusListComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing', 'bonus'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-setup/adhoc-deduction', component: PayrollProcessAdhocContainerComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-setup/preview', component: PayrollProcessPreviewListComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   },
//   {
//     path: 'payroll-process-employee', component: PayrollProcessEmployeeContainerComponent,
//     data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
//   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayslipComponentsRoutingModule { }
