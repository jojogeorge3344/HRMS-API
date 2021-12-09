import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { AssetTypeEditComponent } from './asset-type-edit/asset-type-edit.component';
import { AssetTypeCreateComponent } from './asset-type-create/asset-type-create.component';
import { AssetTypeListComponent } from './asset-type-list/asset-type-list.component';



@NgModule({
  declarations: [
    AssetTypeListComponent,
    AssetTypeCreateComponent,
    AssetTypeEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: AssetTypeListComponent,
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Type'], name: 'settings-asset' }
      },
      {
        path: '', 
        component: AssetTypeListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Type'], name: 'settings-asset' }
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
export class AssetTypeModule { }
