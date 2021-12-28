import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
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

  @Input() assetType: AssetAssets;
  toastr: any;
  editForm: any;
  AssetId: number;
  assets: AssetAssets;

  constructor(private assetTypeService : AssetTypeService,
    public activeModal: NgbActiveModal,
    private assetassetService: AssetAssetsService) { }

  ngOnInit(): void {
  
  }

}
