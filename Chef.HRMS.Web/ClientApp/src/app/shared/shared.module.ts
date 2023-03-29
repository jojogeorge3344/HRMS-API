import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsModule } from './dialogs/dialogs.module';
import { DocumentViewModalComponent } from './document-view-modal/document-view-modal.component';

@NgModule({
  declarations: [DocumentViewModalComponent],
  imports: [
    CommonModule,
    DialogsModule
  ],
  exports: [
    
  ]
})
export class SharedModule { }
