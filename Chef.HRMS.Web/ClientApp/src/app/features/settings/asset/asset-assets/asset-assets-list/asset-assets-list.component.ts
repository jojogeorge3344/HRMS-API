import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetAssetsCreateComponent } from '../asset-assets-create/asset-assets-create.component';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-list',
  templateUrl: './asset-assets-list.component.html'
})
export class AssetAssetsListComponent implements OnInit {

  assetAssets: AssetAssets[];
  assetTypeNames: string[];


  constructor(
    private assetassetService: AssetAssetsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
     ) {
    
   }

  ngOnInit(): void {
   
  }
  openCreate(){
    const modalRef = this.modalService.open(AssetAssetsCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeNames = this.assetTypeNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
       
      }
    });
  }
 


}
