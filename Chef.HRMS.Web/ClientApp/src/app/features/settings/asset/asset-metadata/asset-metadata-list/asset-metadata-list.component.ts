import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { AssetMetadataCreateComponent } from '../asset-metadata-create/asset-metadata-create.component';
import { AssetMetadataEditComponent } from '../asset-metadata-edit/asset-metadata-edit.component';
import { AssetMetadataService } from '../asset-metadata.service';
import { AssetTypeService } from '../../asset-type/asset-type.service';
import { AssetType } from '../../asset-type/asset-type.model';
import { AssetTypeMetadata } from '../asset-metadata.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import{ AssetAssetsService} from '../../asset-assets/asset-assets.service';

 
@Component({
  selector: 'hrms-asset-metadata-list',
  templateUrl: './asset-metadata-list.component.html'
})
export class AssetMetadataListComponent implements OnInit {

  assetType: AssetType[];
  assetTypeNames: string[];
  assetMetadata:AssetTypeMetadata[];
  assetMetadataNames:string[];

//   public mySentences:Array<any> = [
//     {id: 35,text: ['sameera1,sameera2']},
//     {id: 28,text: ['justin1,justin2']},
//     {id: 29,text: ['antony1','antony2']},
//     {id: 30,text: ['Sentence1','Sentence2']},
    
// ];

// public mySentences:Array<any> = [
//   {id: 35,text: ['sameera1']},
//   {id: 28,text: ['justin1']},
//   {id: 29,text: ['antony1']},
//   {id: 30,text: ['Sentence1']},
//   {id: 35,text: ['sameera2']},
//   {id: 28,text: ['justin2']},
//   {id: 29,text: ['antony2']},
//   {id: 30,text: ['Sentence2']}
  
// ];

  constructor(
    private assetMetadataService: AssetMetadataService,
    private assetAssetService:AssetTypeService,
    private assetTypeService:AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
    ) { }

  ngOnInit(): void {
    this.getAssetTypeList();
    this.getAssetMetadataList();
  }

  getAssetTypeList() { 
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetType = result;
      this.assetTypeNames = this.assetType?.map(a => a.assettypename.toLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the asset type Details');
    });
  }

  // getAssignedHolidayCategories() {
  //   this.assetAssetService.getAll().subscribe(res => {
  //     this.assignedHolidayCategories = res;
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }

  // isDisabled(category) {
  //   return this.assignedHolidayCategories.includes(category.id);
  // }

  // displayMetadata(type){

  //   return this.assetMetadata.find(val=>val.assettypeId == type.id)?this.assetMetadata.find(val=>val.assettypeId==type.id).metadata:'-';

  //  }

  displayMetadata(type){
    var metData=this.assetMetadata?.filter(item => item.assettypeId === type.id);
      var data=metData?.map(val=>val.metadata);
      return data ? data.join(", ") : "-";
    }
 

  getAssetMetadataList() {
    this.assetMetadataService.getAllMetadata().subscribe(result => {
     this.assetMetadata=result;     
      this.assetMetadataNames = this.assetMetadata?.map(a => a.metadata);
      console.log(this.assetMetadataNames);
    },
    error => {
      this.toastr.showErrorMessage('Unable to fetch the metadata Details');
    });
  }

  isDisabled(assetType) {
    return (assetType.numberOfEmployees > 0);
  }

  openCreate() {
    const modalRef = this.modalService.open(AssetMetadataCreateComponent,
      { size:'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeNames = this.assetTypeNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAssetMetadataList();
      }
    });
  }

  openEdit(assettypeid,assettypename,metadata: AssetTypeMetadata[]) {
    const modalRef = this.modalService.open(AssetMetadataEditComponent,
      { size:'lg', centered: true, backdrop: 'static' });
      modalRef.componentInstance.assetTpId=assettypeid;
    modalRef.componentInstance.assetTpName=assettypename;
    modalRef.componentInstance.metaData = metadata;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getAssetMetadataList();
        }
    });
  }

  openViewList(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetMetadataListComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetType = assetType;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getAssetMetadataList();
        }
    });
  }

  delete(assetType: AssetType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset type ${assetType.assettypename}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.assetTypeService.delete(assetType.id).subscribe(() => {
            this.toastr.showSuccessMessage('The asset type deleted successfully!');
            this.getAssetMetadataList();
          });
        }
    });
  }
}

