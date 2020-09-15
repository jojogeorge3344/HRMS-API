import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./overtime-policy/overtime-policy.module').then(m => m.OvertimePolicyModule),
    data: { name: 'settings-overtime' }
  },
  {
    path: 'overtime-policy',
    loadChildren: () => import('./overtime-policy/overtime-policy.module').then(m => m.OvertimePolicyModule),
    data: { name: 'settings-overtime' }
  },
  {
    path: 'overtime-policy-configuration',
    loadChildren: () => import('./overtime-policy-configuration/overtime-policy-configuration.module').then(m => m.OvertimePolicyConfigurationModule),
    data: { name: 'settings-overtime' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OvertimeSettingsRoutingModule { }
