import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetContainerComponent } from "./asset-container/asset-container.component"


const routes: Routes = [
  {
    path: '',
    component: AssetContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'asset-type', pathMatch: 'full'
      },
      {
        path: 'asset-type',
        loadChildren: () => import('./asset-type/asset-type.module').then(m => m.AssetTypeModule),
        data: { name: 'settings-expense' }
      },
      {
        path: 'asset-metadata',
        loadChildren: () => import('./asset-metadata/asset-metadata.module').then(m => m.AssetMetadataModule),
        data: { name: 'settings-expense' }
      },
      {
        path: 'asset-assets',
        loadChildren: () => import('./asset-assets/asset-assets.module').then(m => m.AssetAssetsModule),
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
export class AssetRoutingModule { }
