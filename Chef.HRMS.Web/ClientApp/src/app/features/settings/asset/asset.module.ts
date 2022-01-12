import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AssetContainerComponent } from './asset-container/asset-container.component';
import { AssetRoutingModule } from './asset-routing.module';




@NgModule({
  declarations: [AssetContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AssetRoutingModule 
  ],
  providers:[DatePipe,]
})
export class AssetModule { }
