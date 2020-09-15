import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputRestrictionDirective } from './input-restriction.directive';
import { PadAtstartDirective } from './pad-atstart.directive';
import { BlockPasteDirective } from './block-paste.directive';




@NgModule({
  declarations: [InputRestrictionDirective, PadAtstartDirective, BlockPasteDirective],
  imports: [
    CommonModule
  ],
  exports: [
    InputRestrictionDirective,
    PadAtstartDirective,
    BlockPasteDirective
  ]
})
export class DirectivesModule { }
