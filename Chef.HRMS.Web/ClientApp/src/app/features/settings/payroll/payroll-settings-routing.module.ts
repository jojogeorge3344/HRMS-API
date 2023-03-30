import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayrollSettingsContainerComponent } from "./payroll-settings-container/payroll-settings-container.component";


const routes: Routes = [
  {
    path: '',
    component: PayrollSettingsContainerComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'payroll-structure' },
      {
        path: 'payroll-structure',
        loadChildren: () => import('./payroll-structure/payroll-structure.module').then(m => m.PayrollStructureModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'payroll-component',
        loadChildren: () => import('./payroll-component/payroll-component.module').then(m => m.PayrollComponentModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'payroll-calendar',
        loadChildren: () => import('./payroll-calendar/payroll-calendar.module').then(m => m.PayrollCalendarModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'pay-group',
        loadChildren: () => import('./pay-group/pay-group.module').then(m => m.PayGroupModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'payroll-calculation',
        loadChildren: () => import('./payroll-calculation/payroll-calculation.module').then(m => m.PayrollCalculationModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'payroll-lop-settings',
        loadChildren: () => import('./payroll-lop-settings/payroll-lop-settings.module').then(m => m.PayrollLOPSettingsModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'payslip-configuration',
        loadChildren: () => import('./payslip/payslip.module').then(m => m.PayslipModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'user-variable',
        loadChildren: () => import('./user-variable/user-variable.module').then(m => m.UserVariableGroupModule),
        data: { name: 'settings-overtime'}
      },
      {
        path: 'system-variable',
        loadChildren: () => import('./system-variable/system-variable.module').then(m => m.SystemVariableModule),
        data: { name: 'settings-overtime'}
      }
    ]
  },
  {
    path: ':id/payroll-configuration',
    loadChildren: () => import('./payroll-configuration/payroll-configuration.module').then(m => m.PayrollConfigurationModule),
    data: { name: 'settings-overtime'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollSettingsRoutingModule { }
