import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EosContainerComponent } from './eos-container/eos-container.component';

const routes: Routes = [
  {
    path: '',
    component: EosContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'eos', pathMatch: 'full'
      },
      {
        path: 'eos',
        loadChildren: () => import('./eos.module').then(m => m.EosModule),
        data: { name: 'settings-expense' }
      },
      {
        path: 'eos-slab',
        loadChildren: () => import('./eos-slab/eos-slab.module').then(m => m.EosSlabModule),
        data: { name: 'settings-expense' }
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EosRoutingModule { }
