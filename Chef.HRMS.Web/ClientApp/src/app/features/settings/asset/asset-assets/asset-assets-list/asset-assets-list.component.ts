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
 


  openView(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetAssetsViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetType = assetType;

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

  getAssetTypeName(asset){
    return this.assetTypes.find(val=>val.id == asset.assetTypeId)?this.assetTypes.find(val=>val.id == asset.assetTypeId).assettypename:'-'
  }

  // displayMetadata(type){
  //   var metData=this.assetMetadata.filter(item => item.assettypeId === type.id);
  //     var data=metData.map(val=>val.metadata)
  //     return data ? data.join(",") : "-";
  //   }
  // getMetadataName(asset){
  //   return this.assetMetadata.find(val =>val.id == asset.assetMetadata)?this.assetMetaDataNames.find(val =>val.id == asset.assetTypeMetaDataId).assetmetadataname:'-'
  // }
 
  getAllAssetList() {
    this.assetassetService.getAllAssetList().subscribe(result => {
      console.log("res",result);
      this.assetList = result; 
      //this.assetTypeNames = this.assetTypes.map(a => a.assettypename.toLocaleLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Asset Details');
    });
  }


  //delete

  delete(assetTypes: AssetType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset ${assetTypes.assettypename}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.assetassetService.delete(assetTypes.id).subscribe(() => {
          this.toastr.showSuccessMessage('asset deleted successfully!');
          this.getAllAssetList();
        });
      }
    });
  }
}
// delete(assetType: AssetType) {
//   const modalRef = this.modalService.open(ConfirmModalComponent,
//     { centered: true, backdrop: 'static' });

//   modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset type ${assetType.assettypename}?`;
//   modalRef.result.then((userResponse) => {
//       if (userResponse == true) {
//         this.assetTypeService.delete(assetType.id).subscribe(() => {
//           this.toastr.showSuccessMessage('The asset type deleted successfully!');
//           this.getAssetTypeList();
//         });
//       }
//   });
// }

