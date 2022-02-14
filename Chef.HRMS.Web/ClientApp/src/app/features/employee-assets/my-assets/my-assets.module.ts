import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { DatePipe } from '@angular/common';
import { MyAssetsViewComponent } from './my-assets-view/my-assets-view.component';
import { MyAssetsListComponent } from './my-assets-list/my-assets-list.component';
import { MyAssetsChangeComponent } from './my-assets-change/my-assets-change.component';
import { MyAssetsReturnComponent } from './my-assets-return/my-assets-return.component';

@NgModule({
  declarations: [
    MyAssetsViewComponent,
    MyAssetsListComponent, 
    MyAssetsChangeComponent,
    MyAssetsReturnComponent],
    imports: [
      CommonModule,
      RouterModule.forChild([
        { path: '', 
          component: MyAssetsListComponent,
          data: { breadcrumbs: ['Me', 'My Assets', 'My Assets'], name: 'settings-asset' }
        },
        {
          path: '', 
          component: MyAssetsListComponent,
          outlet: 'tab-content',
          data: { breadcrumbs: ['Me', 'My Assets', 'My Assets'], name: 'settings-asset' }
        }
      ]),
      NgbModule,
      FormsModule,
      ReactiveFormsModule,
      NgBootstrapFormValidationModule.forRoot(),
      BsDropdownModule.forRoot(),
      DirectivesModule,
      PipesModule
    ], providers: [DatePipe,{
      provide: CUSTOM_ERROR_MESSAGES,
      useValue: CUSTOM_ERRORS,
      multi: true
    }],
  })
export class MyAssetsModule { }

