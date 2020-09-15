import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseSettingsContainerComponent } from "./expense-settings-container/expense-settings-container.component";


const routes: Routes = [
  {
    path: '',
    component: ExpenseSettingsContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'expense-policy', pathMatch: 'full'
      },
      {
        path: 'expense-policy',
        loadChildren: () => import('./expense-policy/expense-policy.module').then(m => m.ExpensePolicyModule),
        data: { name: 'settings-expense' }
      },
      {
        path: 'expense-type',
        loadChildren: () => import('./expense-type/expense-type.module').then(m => m.ExpenseTypeModule),
        data: { name: 'settings-expense' }
      }
    ]
  },
  {
    path: ':id/expense-policy-configuration',
    loadChildren: () => import('./expense-configuration/expense-configuration.module').then(m => m.ExpenseConfigurationModule),
    data: { name: 'settings-expense' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseSettingsRoutingModule { }
