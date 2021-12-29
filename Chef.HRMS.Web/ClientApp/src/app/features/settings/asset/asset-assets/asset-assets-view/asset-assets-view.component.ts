import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AssetTypeMetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';
import { AssetMetadataService } from '@settings/asset/asset-metadata/asset-metadata.service';

@Component({
  selector: 'hrms-asset-assets-view',
  templateUrl: './asset-assets-view.component.html'
})

export class AssetAssetsViewComponent implements OnInit {

  @Input() assetType: AssetAssets;
  @Input() assetTypename: AssetAssets;
  toastr: any;
  editForm: any;
  AssetId: number;
  assets: AssetAssets;
  assetTypeNames: string[];
  assetMetaDataName : string;
  assetMetadata:AssetTypeMetadata[];
  formBuilder: any;

  constructor(private assetTypeService : AssetTypeService,
    public activeModal: NgbActiveModal,
    public assetmetadataservice: AssetMetadataService,
    private assetassetService: AssetAssetsService) { }

  ngOnInit(): void {
    this.AssetId = getCurrentUserId();
    this.assetmetadataservice.getAllMetadata().subscribe(result => {
      this.assetMetadata = result;
      console.log(this.assetMetadata);
      this.assetMetaDataName=this.getMetadataName();
      console.log(this.assetMetaDataName);

      
      
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the asset type Details');
    });

    // this.getAssetDetailsId();
    console.log(this.assetType);
    //console.log(this.assetType.assetTypeMetadataId);
    
   
   
    
  
  }
  getMetadataName(){
    return this.assetMetadata?.find(val=>val.id == this.assetType.assetTypeMetadataId)?this.assetMetadata?.find(val=>val.id == this.assetType.assetTypeMetadataId).metadata:'-'
  }

  
}
