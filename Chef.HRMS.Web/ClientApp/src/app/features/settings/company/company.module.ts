import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgBootstrapFormValidationModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'introduction' },
      {
        path: 'general', component: GeneralComponent,
        data: { breadcrumbs: ['Settings', 'Company', 'General'] }
      }
    ])
  ]
})

export class CompanyModule { }
