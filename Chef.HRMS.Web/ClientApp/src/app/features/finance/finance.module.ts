import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatePipe } from '@angular/common';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { ExpensePayoutListComponent } from './expense-payout/expense-payout-list/expense-payout-list.component';
import { ExpensePayoutComponent } from './expense-payout/expense-payout/expense-payout.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { NumberToWordsPipe } from 'src/app/pipes/number-to-words.pipe';
import { ExpensePayoutViewComponent } from './expense-payout/expense-payout-view/expense-payout-view.component';



@NgModule({
  declarations: [
    ExpensePayoutListComponent,
    ExpensePayoutComponent,
    ExpensePayoutViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'expense', component: ExpensePayoutListComponent,
        data: { breadcrumbs: ['Finance', 'Expense'], name: 'finance-expensepayout' }
      }

    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
    BsDropdownModule.forRoot(),
    DirectivesModule,
    PipesModule
  ],
  entryComponents: [
    ExpensePayoutComponent,
    ExpensePayoutViewComponent
  ],
  providers: [
    SplitByUpperCasePipe,
    NumberToWordsPipe,
    DatePipe
  ]
})
export class FinanceModule { }
