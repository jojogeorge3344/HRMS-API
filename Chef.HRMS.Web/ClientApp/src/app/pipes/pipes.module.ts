import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitByUpperCasePipe } from './split-by-upper-case.pipe';
import { NumberToWordsPipe } from './number-to-words.pipe';


@NgModule({
  declarations: [SplitByUpperCasePipe, NumberToWordsPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    SplitByUpperCasePipe
  ]
})
export class PipesModule { }
