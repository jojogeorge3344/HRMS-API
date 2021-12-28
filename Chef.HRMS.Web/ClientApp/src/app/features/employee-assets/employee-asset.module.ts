import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAssetContainerComponent } from './employee-asset-container/employee-asset-container.component';
import { EmployeeAssetRoutingModule } from './employee-asset-routing.module';



@NgModule({
  declarations: [EmployeeAssetContainerComponent],
  imports: [
    CommonModule,
    NgbModule,
    EmployeeAssetRoutingModule
  ]
})
export class EmployeeAssetModule { }


