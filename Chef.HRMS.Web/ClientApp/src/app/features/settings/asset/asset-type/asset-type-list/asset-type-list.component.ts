import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { AssetTypeCreateComponent } from '../asset-type-create/asset-type-create.component';
import { AssetTypeEditComponent } from '../asset-type-edit/asset-type-edit.component';
import { AssetTypeService } from '../asset-type.service';
import { AssetType } from '../asset-type.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';




@Component({
  selector: 'hrms-asset-type-list',
  templateUrl: './asset-type-list.component.html'
})
export class AssetTypeListComponent implements OnInit {

  assetType: AssetType[];
  assetTypeNames: string[];

  constructor(
    private assetTypeService: AssetTypeService,
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
    const modalRef = this.modalService.open(AssetTypeCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeNames = this.assetTypeNames;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getJobList();
      }
    });
  }

  openEdit(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetTypeEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.assetTypeId = assetType.id;
    modalRef.componentInstance.assetTypeNames = this.assetTypeNames.filter(v => v !== assetType.name.toLowerCase());

    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getJobList();
        }
    });
  }

  openViewList(assetType: AssetType) {
    const modalRef = this.modalService.open(AssetTypeListComponent,
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
