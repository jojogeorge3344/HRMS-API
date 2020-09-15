import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';

import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [ 
    LoginComponent, 
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        pathMatch: 'full', 
        redirectTo: 'login' 
      },
      { path: 'login', 
        component: LoginComponent,
      },
      {
        path: 'reset-password', 
        component: ResetPasswordComponent,
      }
    ]),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule    
  ],
})
export class AuthModule { }
