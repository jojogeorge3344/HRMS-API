import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAssetContainerComponent } from "./employee-asset-container/employee-asset-container.component"
const routes: Routes = [
  {
    path: '',
    component: EmployeeAssetContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'raise-request', pathMatch: 'full'
      },
      {
        path: 'raise-request',
        loadChildren: () => import('./raise-request/raise-request.module').then(m => m.RaiseRequestModule),
        data: { name: 'settings-expense' }
      },
      {
        path: 'my-assets',
        loadChildren: () => import('./my-assets/my-assets.module').then(m => m.MyAssetsModule),
        data: { name: 'settings-expense' }
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAssetRoutingModule { }
