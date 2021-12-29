import { Component, NgModuleRef, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssetTypeMetadata } from '@settings/asset/asset-metadata/asset-metadata.model';
import { AssetType } from '@settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '@settings/asset/asset-type/asset-type.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetAssetsCreateComponent } from '../asset-assets-create/asset-assets-create.component';
import { AssetAssetsEditComponent } from '../asset-assets-edit/asset-assets-edit.component';
import { AssetAssetsViewComponent } from '../asset-assets-view/asset-assets-view.component';
import { AssetAssets } from '../asset-assets.model';
import { AssetAssetsService } from '../asset-assets.service';

@Component({
  selector: 'hrms-asset-assets-list',
  templateUrl: './asset-assets-list.component.html'
})
export class AssetAssetsListComponent implements OnInit {

  assetList: AssetAssets[];
  assetTypeNames: string[];
  assetTypes: AssetType[];
  assetMetaDataNames : string[];
  assetMetadata:AssetTypeMetadata[];


  constructor(
    private assetassetService: AssetAssetsService,
    private assetTypeService : AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
     ) {
    
   }

  ngOnInit(): void {
   this.getAllAssetList();
   this.getAllAssetTypeList();
    
  }
  openCreate(){
    const modalRef = this.modalService.open(AssetAssetsCreateComponent,
      { centered: true, backdrop: 'static' });
      
    modalRef.componentInstance.assetTypeNames = this.assetTypeNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllAssetList();
      }
    });
  }

  //
  openView(assetType: AssetType,assetTypename) {
    console.log(assetType);
    console.log(assetTypename);
    
    const modalRef = this.modalService.open(AssetAssetsViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.assetType = assetType;
    modalRef.componentInstance.assetTypename = assetTypename;
    
    modalRef.result.then((result) => {
      if (result == 'submit') {
       this.getAllAssetList();
      }
    });
  }
  

  openEdit(editassetType,assetTypename) {
    console.log(assetTypename);
    console.log(editassetType);

    const modalRef = this.modalService.open(AssetAssetsEditComponent,
      { size:'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetType = editassetType;
    modalRef.componentInstance.assetTypeName = assetTypename;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getAllAssetList();
        }
    });
  }

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
    return this.assetTypes?.find(val=>val.id == asset.assetTypeId)?this.assetTypes?.find(val=>val.id == asset.assetTypeId).assettypename:'-'
  }


 
  getAllAssetList() {
    this.assetassetService.getAll().subscribe(result => {
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


  //delete

  delete(assetType: AssetType) {
    console.log(assetType);
    
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset ${assetType['assetName']}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.assetassetService.delete(assetType.id).subscribe(() => {
          this.toastr.showSuccessMessage('asset deleted successfully!');
          this.getAllAssetList();
        });
      }
    });
  }
}
