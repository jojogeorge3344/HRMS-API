import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES} from 'ng-bootstrap-form-validation';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { CUSTOM_ERRORS } from '@shared/utils/validators.messages';
import { AssetMetadataListComponent } from './asset-metadata-list/asset-metadata-list.component';
import { AssetMetadataCreateComponent } from './asset-metadata-create/asset-metadata-create.component';
import { AssetMetadataEditComponent } from './asset-metadata-edit/asset-metadata-edit.component';



@NgModule({
  declarations: [
    AssetMetadataListComponent,
    AssetMetadataCreateComponent,
    AssetMetadataEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', 
        component: AssetMetadataListComponent,
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Metadata'], name: 'settings-asset' }
      },
      {
        path: '', 
        component: AssetMetadataListComponent,
        outlet: 'tab-content',
        data: { breadcrumbs: ['Settings', 'Asset', 'Asset Metadata'], name: 'settings-asset' }
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
export class AssetMetadataModule { }
