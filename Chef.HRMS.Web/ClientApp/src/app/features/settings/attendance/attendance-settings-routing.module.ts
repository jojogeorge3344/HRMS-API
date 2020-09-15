import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceSettingsContainerComponent } from './attendance-settings-container/attendance-settings-container.component';


const routes: Routes = [
  {
    path: '',
    component: AttendanceSettingsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'shift-management', pathMatch: 'full'
      },
      {
        path: 'shift-management',
        loadChildren: () => import('./shift/shift.module').then(m => m.ShiftModule),
        data: { name: 'settings-attendance' }
      },
      {
        path: 'work-from-home-settings',
        loadChildren: () => import('./work-from-home-settings/work-from-home-settings.module').then(m => m.WorkFromHomeSettingsModule),
        data: { name: 'settings-attendance' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceSettingsRoutingModule { }
