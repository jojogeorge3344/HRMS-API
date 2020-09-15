import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchesComponent } from './branches/branches.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBranchComponent } from './branches/create/create.component';
import { EditBranchComponent } from './branches/edit/edit.component';
import { BanksComponent } from './banks/banks.component';
import { SignatoriesComponent } from './signatories/signatories.component';
import { CreateSignatoryComponent } from './signatories/create/create.component';
import { EditSignatoryComponent } from './signatories/edit/edit.component';
import { CreateBankComponent } from './banks/create/create.component';
import { EditBankComponent } from './banks/edit/edit.component';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [BranchesComponent,
    BanksComponent,
    CreateBranchComponent,
    EditBranchComponent,
    BanksComponent,
    SignatoriesComponent,
    CreateSignatoryComponent,
    EditSignatoryComponent,
    CreateBankComponent,
    EditBankComponent],
  imports: [
    CommonModule,
    NgBootstrapFormValidationModule,
    RouterModule.forChild([
      {
        path: '', component: BranchesComponent,
        data: { breadcrumbs: ['Settings', 'Branches'] }
      },
      {
        path: 'banks/:id', component: BanksComponent,
        data: { breadcrumbs: ['Settings', 'Branch', 'Banks'] }
      },
      {
        path: 'signatories/:id', component: SignatoriesComponent,
        data: { breadcrumbs: ['Settings', 'Branch', 'Signatories'] }
      },
    ]),

    NgbModule,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [
    CreateBranchComponent,
    EditBranchComponent,
    CreateSignatoryComponent,
    EditSignatoryComponent,
    CreateBankComponent,
    EditBankComponent
  ]
})
export class BranchModule { }
