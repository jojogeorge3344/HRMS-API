import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollProcessListComponent } from './payroll-process-list/payroll-process-list.component';
import { PayrollProcessViewComponent } from './payroll-process-view/payroll-process-view.component';
import { PayrollProcessCreateContainerComponent } from './payroll-process-create-container/payroll-process-create-container.component';
import { PayrollProcessBonusListComponent } from './payroll-process-bonus/payroll-process-bonus-list/payroll-process-bonus-list.component';
import { PayrollProcessLeaveListComponent } from './payroll-process-leave/payroll-process-leave-list/payroll-process-leave-list.component';
import { PayrollProcessSalaryListComponent } from './payroll-process-salary/payroll-process-salary-list/payroll-process-salary-list.component';
import { PayrollProcessAdhocContainerComponent } from './payroll-process-adhoc/payroll-process-adhoc-container/payroll-process-adhoc-container.component';
import { PayrollProcessEmployeeContainerComponent } from './payroll-process-employee-container/payroll-process-employee-container.component';
import { PayrollProcessPreviewListComponent } from './payroll-process-preview/payroll-process-preview-list/payroll-process-preview-list.component';

const routes: Routes = [
  {
    path: '', component: PayrollProcessListComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-view', component: PayrollProcessViewComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-setup', component: PayrollProcessCreateContainerComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' },
  },
  {
    path: 'payroll-process-setup/leave-attendance', component: PayrollProcessLeaveListComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-setup/salary-component', component: PayrollProcessSalaryListComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-setup/bonus', component: PayrollProcessBonusListComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing', 'bonus'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-setup/adhoc-deduction', component: PayrollProcessAdhocContainerComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-setup/preview', component: PayrollProcessPreviewListComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  },
  {
    path: 'payroll-process-employee', component: PayrollProcessEmployeeContainerComponent,
    data: { breadcrumbs: ['Organisation', 'Payroll Processing'], name: 'organization-payrollprocessing' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollProcessRoutingModule { }
