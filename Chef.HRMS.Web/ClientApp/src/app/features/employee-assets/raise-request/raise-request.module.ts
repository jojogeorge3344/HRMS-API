import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { RaiseRequestCreateComponent } from './raise-request-create/raise-request-create.component';
import { RaiseRequestEditComponent } from './raise-request-edit/raise-request-edit.component';
import { RaiseRequestListComponent } from './raise-request-list/raise-request-list.component';
import { RaiseRequestViewComponent } from './raise-request-view/raise-request-view.component';



@NgModule({
  declarations: [
    RaiseRequestCreateComponent,
    RaiseRequestEditComponent,
    RaiseRequestListComponent,
    RaiseRequestViewComponent],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: '', 
          component: RaiseRequestListComponent,
          data: { breadcrumbs: ['Me', 'My Assets', 'Raise Request'], name: 'settings-asset' }
        },
        {
          path: '', 
          component: RaiseRequestListComponent,
          outlet: 'tab-content',
          data: { breadcrumbs: ['Me', 'My Assets', 'Raise Request'], name: 'settings-asset' }
        }
      ]),
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      NgBootstrapFormValidationModule.forRoot(),
      BsDropdownModule.forRoot(),
      DirectivesModule
    ], providers: [{
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    }],
  })
export class RaiseRequestModule { }
