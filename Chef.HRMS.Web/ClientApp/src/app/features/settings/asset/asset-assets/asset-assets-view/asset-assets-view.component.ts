import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AssetTypeMetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-view',
  templateUrl: './asset-assets-view.component.html'
})

export class AssetAssetsViewComponent implements OnInit {
  assetviewForm: FormGroup;

  @Input() assetType: AssetAssets;
  @Input()  assetList: AssetAssets[];
  toastr: any;
  editForm: any;
  AssetId: number;
  assets: AssetAssets;
  assetTypeNames: string[];
  assetMetaDataNames : string[];
  assetMetadata:AssetTypeMetadata[];
  formBuilder: any;

  constructor(private assetTypeService : AssetTypeService,
    public activeModal: NgbActiveModal,
    privateformbuilder: FormBuilder,
    private assetassetService: AssetAssetsService) { }

  ngOnInit(): void {
    this.AssetId = getCurrentUserId();
    this.getAssetDetailsId();
    console.log(this.assetList);
    console.log(this.assetType);
    this.assetviewForm = this.createFormGroup();
    
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      assetId: [''],
      date: [],
      assetType: [],
      assetName: [],
      metaData: [],
      description: [],
    });
  }

  getAssetDetailsId() {
    console.log(this.AssetId)
    this.assetassetService.getAssetById(this.AssetId).subscribe(result => {
      this.assets = result;
      console.log(this.assets);
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Asset Details');
    });
  }
}
