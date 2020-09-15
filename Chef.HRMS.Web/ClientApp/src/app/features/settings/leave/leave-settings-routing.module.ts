import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveSettingsContainerComponent } from "./leave-settings-container/leave-settings-container.component";

const routes: Routes = [
  {
    path: '',
    component: LeaveSettingsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'leave-structure', pathMatch: 'full'
      },
      {
        path: 'leave-structure',
        loadChildren: () => import('./leave-structure/leave-structure.module').then(m => m.LeaveStructureModule),
        data: { name: 'settings-leave' }
      },
      {
        path: 'leave-component',
        loadChildren: () => import('./leave-component/leave-component.module').then(m => m.LeaveComponentModule),
        data: { name: 'settings-leave' }
      }
    ]
  },
  {
    path: ':leaveStructureId/leave-configuration',
    loadChildren: () => import('./leave-configuration/leave-configuration.module').then(m => m.LeaveConfigurationModule),
    data: { name: 'settings-leave' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveSettingsRoutingModule { }
