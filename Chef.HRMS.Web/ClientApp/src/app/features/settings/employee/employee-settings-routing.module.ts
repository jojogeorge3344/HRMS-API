import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeSettingsContainerComponent } from "./employee-settings-container/employee-settings-container.component";


const routes: Routes = [
  {
    path: '',
    component: EmployeeSettingsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'employee-job-title', pathMatch: 'full'
      },
      {
        path: 'employee-job-title',
        loadChildren: () => import('./employee-job-title/employee-job-title.module').then(m => m.EmployeeJobTitleModule),
        data: { name: 'settings-employee' }
      },
      {
        path: 'employee-defaults',
        loadChildren: () => import('./employee-defaults/employee-defaults.module').then(m => m.EmployeeDefaultsModule),
        data: { name: 'settings-employee' }
      },
      {
        path: 'employee-numbers',
        loadChildren: () => import('./employee-numbers/employee-numbers.module').then(m => m.EmployeeNumbersModule),
        data: { name: 'settings-employee' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeSettingsRoutingModule { }
