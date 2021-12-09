import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { AssetAssetsListComponent } from './asset-assets-list/asset-assets-list.component';
import { AssetAssetsCreateComponent } from './asset-assets-create/asset-assets-create.component';
import { AssetAssetsEditComponent } from './asset-assets-edit/asset-assets-edit.component';
import { AssetAssetsViewComponent } from './asset-assets-view/asset-assets-view.component';



@NgModule({
  declarations: [
    AssetAssetsListComponent,
    AssetAssetsCreateComponent,
    AssetAssetsEditComponent,
    AssetAssetsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: AssetAssetsListComponent,
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Assets'], name: 'settings-asset' }
      },
      {
        path: '', 
        component: AssetAssetsListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Assets'], name: 'settings-asset' }
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
export class AssetAssetsModule { }
