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

  //
  openView(assetType: AssetType, assetList : AssetAssets) {
    const modalRef = this.modalService.open(AssetAssetsViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.assetType = assetType;
    modalRef.componentInstance.assetList = assetList;
    modalRef.result.then((result) => {
      if (result == 'submit') {
       this.getAllAssetList();
      }
    });
  }
  //

  // openViewList(assetType: AssetType) {
  //   const modalRef = this.modalService.open(AssetAssetsListComponent,
  //     { size: 'lg', centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.assetType = assetType;

  //   modalRef.result.then((result) => {
  //       if (result == 'submit') {
  //         this.getAllAssetList();
  //       }
  //   });
  // }

  openEdit(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetAssetsEditComponent,
      { size:'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeId = assetType.id;
    modalRef.componentInstance.assetTypeNames = this.assetTypeNames.filter(v => v !== assetType.assettypename.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getAllAssetList();
        }
    });
  }

  // openView(assetType: AssetType) {
  //   const modalRef = this.modalService.open(AssetAssetsViewComponent,
  //     { size: 'lg', centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.assetType = assetType;

  //   modalRef.result.then((result) => {
  //     if (result == 'submit') {
  //       this.getAllAssetList();
  //     }
  //   });
  // }

  getAllAssetTypeList() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypes = result;
      this.assetTypeNames = this.assetTypes.map(a => a.assettypename.toLowerCase());
      console.log(this.assetTypes);
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the asset type Details');
    });

  }
  //filtering assetType corresponds to assetname
  getAssetTypeName(asset){
    return this.assetTypes.find(val=>val.id == asset.assetTypeId)?this.assetTypes.find(val=>val.id == asset.assetTypeId).assettypename:'-'
  }


 
  getAllAssetList() {
    this.assetassetService.getAllAssetList().subscribe(result => {
      console.log("res",result);
      this.assetList = result; 
      console.log(this.assetList);
      
      //this.assetTypeNames = this.assetTypes.map(a => a.assettypename.toLocaleLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Asset Details');
    });
  }



}


