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


@Component({
  selector: 'hrms-asset-metadata-list',
  templateUrl: './asset-metadata-list.component.html'
})
export class AssetMetadataListComponent implements OnInit {

  assetType: AssetType[];
  assetTypeNames: string[];

  constructor(
    private assetMetadataService: AssetMetadataService,
    private assetTypeService:AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
    ) { }

  ngOnInit(): void {
    this.getJobList();
  }

  getJobList() {
    this.assetTypeService.getAllJobTitleList().subscribe(result => {
      this.assetType = result;
      this.assetTypeNames = this.assetType.map(a => a.name.toLowerCase());
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Job Title Details');
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
        this.getJobList();
      }
    });
  }

  openEdit(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetMetadataEditComponent,
      { size:'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeId = assetType.id;
    modalRef.componentInstance.assetTypeNames = this.assetTypeNames.filter(v => v !== assetType.name.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  openViewList(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetMetadataListComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetType = assetType;

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  delete(assetType: AssetType) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the asset type ${assetType.name}?`;
    modalRef.result.then((userResponse) => {
        if (userResponse == true) {
          this.assetTypeService.delete(assetType.id).subscribe(() => {
            this.toastr.showSuccessMessage('The asset type deleted successfully!');
            this.getJobList();
          });
        }
    });
  }
}

