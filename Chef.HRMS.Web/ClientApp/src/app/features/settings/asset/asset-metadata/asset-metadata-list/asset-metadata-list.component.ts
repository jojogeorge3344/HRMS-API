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
  assetTypeWithMetadata: AssetType[];
  assetTypeNames: AssetType[];
  assetMetadata: AssetTypeMetadata[];
  assetMetadataNames: string[];
  assignedAssetTypeId: number[] = [];

  constructor(
    private assetMetadataService: AssetMetadataService,
    private assetAssetService: AssetAssetsService,
    private assetTypeService: AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.getAssetTypeList();
    this.getAllAssignedAssetType();
  }

  getAssetTypeWithMetadata() {
    this.assetTypeWithMetadata = this.assetType?.filter(({ id: id1 }) => this.assetMetadata.some(({ assettypeId: id2 }) => id2 === id1));
  }

  getAssetTypeList() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetType = result;
      this.getAssetMetadataList();
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the asset type Details');
      };
  }

  //To disable delete button =>fetching AssetTypeId which is assigned in Asset table, to array 'assignedAssetTypeId'
  getAllAssignedAssetType() {
    this.assetAssetService.getAll().subscribe(res => {
      this.assignedAssetTypeId = res.map(type =>(type.assetTypeId));
      this.assignedAssetTypeId = this.assignedAssetTypeId.filter( function( item, index, inputArray ) {
        return inputArray.indexOf(item) == index;
 });
    },
      error => {
        console.error(error);
      });
  }

  isDisabled(type) {
    return this.assignedAssetTypeId.includes(type.id);
  }

  displayMetadata(type) {
    var metData = this.assetMetadata?.filter(item => item.assettypeId === type.id);
    var data = metData?.map(val => val.metadata);
    return data ? data.join(", ") : "-";
  }

  getAssetMetadataList() {
    this.assetMetadataService.getAllMetadata().subscribe(result => {
      this.assetMetadata = result;
      this.assetMetadataNames = this.assetMetadata?.map(a => a.metadata);
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
        this.getAssetTypeList();
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
        this.getAssetTypeList();
      }
      else {
        this.getAssetTypeList();
      }
    });
  }

  delete(assetType: AssetType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete all asset type metadata of ${assetType.assettypename}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.assetMetadataService.deleteAssetType(assetType.id).subscribe(() => {
          this.toastr.showSuccessMessage('The asset type deleted successfully!');
          this.getAssetTypeList();
        });
      }
    });
  }
}

