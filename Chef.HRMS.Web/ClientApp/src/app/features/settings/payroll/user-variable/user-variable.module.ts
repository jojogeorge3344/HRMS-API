import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import {CUSTOM_ERRORS} from '@shared/utils/validators.messages';
import { UserVariableListComponent } from './user-variable-list/user-variable-list.component';
import { UserVariableCreateComponent } from './user-variable-create/user-variable-create.component';
import { UserVariableEditComponent } from './user-variable-edit/user-variable-edit.component';
import { UserVariableViewComponent } from './user-variable-view/user-variable-view.component';





@NgModule({
  declarations: [
    UserVariableListComponent,
    UserVariableCreateComponent, 
    UserVariableEditComponent, UserVariableViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: UserVariableListComponent,
        data: { breadcrumbs: ['Settings', 'Payroll', 'User Variable'], name: 'settings-overtime' }
      },
      {
        path: '', 
        component: UserVariableListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Payroll', 'User Variable'], name: 'settings-overtime' }
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
})
export class UserVariableGroupModule { }
