import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EosListComponent } from './eos-list/eos-list.component';
import { EosCreateComponent } from './eos-create/eos-create.component';
import { EosEditComponent } from './eos-edit/eos-edit.component';
import { EosViewComponent } from './eos-view/eos-view.component';
import {DropdownModule} from 'primeng/dropdown';


@NgModule({
  declarations: [
    EosListComponent,
    EosCreateComponent,
    EosEditComponent,
    EosViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EosListComponent,
        data: { breadcrumbs: ['Settings', 'List', 'EOS'], name: 'settings-expense' }
      },
      {
        path: '', 
        component: EosListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'List', 'EOS'], name: 'settings-expense'  }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule,
    DropdownModule
    ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  entryComponents: [
    EosCreateComponent,
    EosEditComponent,
  ]
})
export class EosModule { }
