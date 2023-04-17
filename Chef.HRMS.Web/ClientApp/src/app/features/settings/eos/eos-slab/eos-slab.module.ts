import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { EosSlabListComponent } from './eos-slab-list/eos-slab-list.component';
import { EosSlabCreateComponent } from './eos-slab-create/eos-slab-create.component';
import { EosSlabEditComponent } from './eos-slab-edit/eos-slab-edit.component';
import { EosSlabViewComponent } from './eos-slab-view/eos-slab-view.component';



@NgModule({
  declarations: [
    EosSlabListComponent,
    EosSlabCreateComponent,
    EosSlabEditComponent,
    EosSlabViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EosSlabListComponent,
        data: { breadcrumbs: ['Settings', 'List', 'EOS SLAB'], name: 'settings-expense' }
      },
      {
        path: '', 
        component: EosSlabListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'List', 'EOS SLAB'], name: 'settings-expense'  }
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    BsDropdownModule.forRoot(),
    DirectivesModule
    ],
  providers: [{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  entryComponents: [
    EosSlabCreateComponent,
    EosSlabEditComponent,
  ]
})
export class EosSlabModule { }
