import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAssetListComponent } from './employee-asset-list/employee-asset-list.component';
import { RouterModule } from '@angular/router';
import { EmployeeAssetViewComponent } from './employee-asset-view/employee-asset-view.component';
import { EmployeeAssetRequestsComponent } from './employee-asset-requests/employee-asset-requests.component';
import { EmployeeAssetAllocatedComponent } from './employee-asset-allocated/employee-asset-allocated.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmployeeAssetRequestViewComponent } from './employee-asset-request-view/employee-asset-request-view.component';
import { EmployeeAssetChangeorswapComponent } from './employee-asset-changeorswap/employee-asset-changeorswap.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeAssetAllocationComponent } from './employee-asset-allocation/employee-asset-allocation.component';
import { EmployeeAssetChangereturnviewComponent } from './employee-asset-changereturnview/employee-asset-changereturnview.component';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [EmployeeAssetListComponent, EmployeeAssetViewComponent, EmployeeAssetRequestsComponent, EmployeeAssetAllocatedComponent, EmployeeAssetRequestViewComponent,
                 EmployeeAssetChangeorswapComponent, EmployeeAssetAllocationComponent, EmployeeAssetChangereturnviewComponent,],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    DropdownModule,
    BsDropdownModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
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
        path: ':id/allocation/:reqId/:typeId/:assetTypeName', component: EmployeeAssetAllocationComponent,
        data: { breadcrumbs: ['Organization', 'Employee', 'allocation'], name: 'organization-asset' }
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
  ],
  providers: [
    NgbActiveModal,
    SplitByUpperCasePipe
  ]
})
export class EmployeeAssetModule { }
