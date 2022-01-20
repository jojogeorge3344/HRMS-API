import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAssetListComponent } from './employee-asset-list/employee-asset-list.component';
import { RouterModule } from '@angular/router';
import { EmployeeAssetViewComponent } from './employee-asset-view/employee-asset-view.component';
import { EmployeeAssetRequestsComponent } from './employee-asset-requests/employee-asset-requests.component';
import { EmployeeAssetRecallComponent } from './employee-asset-recall/employee-asset-recall.component';
import { EmployeeAssetAllocatedComponent } from './employee-asset-allocated/employee-asset-allocated.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmployeeAssetRequestViewComponent } from './employee-asset-request-view/employee-asset-request-view.component';
import { EmployeeAssetChangeorswapComponent } from './employee-asset-changeorswap/employee-asset-changeorswap.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmployeeAssetListComponent, EmployeeAssetViewComponent, EmployeeAssetRequestsComponent, EmployeeAssetRecallComponent, EmployeeAssetAllocatedComponent, EmployeeAssetRequestViewComponent, EmployeeAssetChangeorswapComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    BsDropdownModule.forRoot(),
    RouterModule.forChild([
      {
        path: '', component: EmployeeAssetListComponent,
        data: {  name: 'organization-asset' }
      },
      {
        path: ':id/view', component: EmployeeAssetViewComponent,
        data: { breadcrumbs: ['Organization', 'Employee', 'view'], name: 'organization-asset' }
      },
      {
        path: ':id/allocatedassets', component: EmployeeAssetAllocatedComponent,
        data: { breadcrumbs: ['Organization', 'Employee', 'allocatedassets'], name: 'organization-asset' }
      },
      {
        path: ':id/requests', component: EmployeeAssetRequestsComponent,
        data: { breadcrumbs: ['Organization', 'Employee', 'requests'], name: 'organization-asset' }
      },
      {
        path: ':id/requestview', component: EmployeeAssetRequestViewComponent,
        data: { breadcrumbs: ['Organization', 'Employee', 'requestview'], name: 'organization-asset' }
      },
    ]),
  ]
})
export class EmployeeAssetModule { }
