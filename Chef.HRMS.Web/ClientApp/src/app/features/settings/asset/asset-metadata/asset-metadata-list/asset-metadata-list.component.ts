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
import { AssetAssetsService } from '../../asset-assets/asset-assets.service';


@Component({
  selector: 'hrms-asset-metadata-list',
  templateUrl: './asset-metadata-list.component.html'
})
export class AssetMetadataListComponent implements OnInit {

  assetType: AssetType[];
  assetTypeNames: AssetType[];
  assetMetadata: AssetTypeMetadata[];
 // assetTypeNames :string[];
  assetMetadataNames: string[];
  assignedAssetTypeId: number[] = [];
  //assetMetadataAssetIds: number[] = [];
  //assetTypeWithMetadata:AssetTypeMetadata[];

  constructor(
    private assetMetadataService: AssetMetadataService,
    private assetAssetService: AssetTypeService,
    private assetTypeService: AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    //this.getAssetTypeWithMetadata()
    this.getAssetTypeList();
   
    
   // console.log(this.assetTypeWithMetadata);
    //console.log(this.assetType);
    
  }

  getAssetTypeWithMetadata() {
    this.assetType = this.assetType?.filter(({ id: id1 }) => this.assetMetadata.some(({ assettypeId: id2 }) => id2 === id1));
    console.log(this.assetType);
    
  }

  getAssetTypeList() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetType = result;
      console.log(this.assetType);
      this.getAssetMetadataList();   
      }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the asset type Details');
      };
  }

  //To disable delete button =>fetching AssetTypeId which is assigned in Asset table, to array 'assignedAssetTypeId'

  // getAllAssignedAssetType() {
  //   this.assetAssetService.getAll().subscribe(res => {
  //     this.assignedAssetTypeId = res.map(type =>(type.assettypeid));
  //   },
  //   error => {
  //     console.error(error);
  //   });
  // }

  // isDisabled(assetType) {
  //   return this.assignedAssetTypeId.includes(assetType.id);
  // }


  // displayMetadata(type){

  //   return this.assetMetadata.find(val=>val.assettypeId == type.id)?this.assetMetadata.find(val=>val.assettypeId==type.id).metadata:'-';

  //  }

  displayMetadata(type) {
    var metData = this.assetMetadata?.filter(item => item.assettypeId === type.id);
    var data = metData?.map(val => val.metadata);
    return data ? data.join(", ") : "-";
  }


  getAssetMetadataList() {
    this.assetMetadataService.getAllMetadata().subscribe(result => {
      this.assetMetadata = result;
      console.log(this.assetMetadata);
      
      this.assetMetadataNames = this.assetMetadata?.map(a => a.metadata);
      console.log(this.assetMetadataNames);
      this.getAssetTypeWithMetadata();
    },
      error => {
        this.toastr.showErrorMessage('Unable to fetch the metadata Details');
      });
  }

  openCreate() {
    const modalRef = this.modalService.open(AssetMetadataCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeNames = this.assetTypeNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAssetMetadataList();
      }
    });
  }

  openEdit(assettypeid, assettypename, metadata: AssetTypeMetadata[]) {
    const modalRef = this.modalService.open(AssetMetadataEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.assetTpId = assettypeid;
    modalRef.componentInstance.assetTpName = assettypename;
    modalRef.componentInstance.metaData = metadata;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAssetMetadataList();
      }
    });
  }

  delete(assetType: AssetType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    console.log(assetType.id);

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete all asset type metadata of ${assetType.assettypename}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.assetMetadataService.delete(assetType.id).subscribe(() => {
          this.toastr.showSuccessMessage('The asset type deleted successfully!');
          this.getAssetMetadataList();
        });
      }
    });
  }
}

