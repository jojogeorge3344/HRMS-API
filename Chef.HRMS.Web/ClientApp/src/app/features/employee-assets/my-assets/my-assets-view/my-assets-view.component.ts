import { Component, OnInit ,Input } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { MyAssets } from '../my-assets.model';
import { MyAssetsService } from '../my-assets.service';
import { AssetAssetsService } from '@settings/asset/asset-assets/asset-assets.service';

@Component({
  selector: 'hrms-my-assets-view',
  templateUrl: './my-assets-view.component.html'
})
export class MyAssetsViewComponent implements OnInit {
  @Input() myAsset: MyAssets;
  constructor(
    private myAssetService:MyAssetsService,
    private maasetAssetsService:AssetAssetsService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
  }

}
