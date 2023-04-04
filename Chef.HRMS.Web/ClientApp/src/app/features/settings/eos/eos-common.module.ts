import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EosRoutingModule } from './eos-routing.module';
import { EosContainerComponent } from './eos-container/eos-container.component';

@NgModule({
  declarations: [
    EosContainerComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    EosRoutingModule
  ]
})
export class EosCommonModule { }
