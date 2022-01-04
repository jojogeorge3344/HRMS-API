import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAssetListComponent } from './employee-asset-list/employee-asset-list.component';
import { RouterModule } from '@angular/router';
import { EmployeeAssetViewComponent } from './employee-asset-view/employee-asset-view.component';
import { EmployeeAssetRequestsComponent } from './employee-asset-requests/employee-asset-requests.component';
import { EmployeeAssetChangeComponent } from './employee-asset-change/employee-asset-change.component';
import { EmployeeAssetRecallComponent } from './employee-asset-recall/employee-asset-recall.component';
import { EmployeeAssetAllocatedComponent } from './employee-asset-allocated/employee-asset-allocated.component';



@NgModule({
  declarations: [EmployeeAssetListComponent, EmployeeAssetViewComponent, EmployeeAssetRequestsComponent, EmployeeAssetChangeComponent, EmployeeAssetRecallComponent, EmployeeAssetAllocatedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: EmployeeAssetListComponent,
        data: {  name: 'organization-asset' }
      }
    ]),
  ]
})
export class EmployeeAssetModule { }
