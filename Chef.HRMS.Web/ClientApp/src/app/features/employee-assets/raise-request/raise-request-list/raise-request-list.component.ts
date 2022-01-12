import { Component, OnInit } from '@angular/core';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { RaiseRequestService } from '../../raise-request/raise-request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { RaiseRequestCreateComponent } from '../raise-request-create/raise-request-create.component';
import { RaiseRequestEditComponent } from '../raise-request-edit/raise-request-edit.component';
import { RaiseRequestViewComponent } from '../raise-request-view/raise-request-view.component';

@Component({
  selector: 'hrms-raise-request-list',
  templateUrl: './raise-request-list.component.html'
})
export class RaiseRequestListComponent implements OnInit {

  raiseRequest: AssetRaiseRequest[];
  assetType: AssetType[];
  assetTypeNames: AssetType[];

  constructor(
    private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.getAssetTypeList();
    this.getraiserequestList();
    // this.getAssignedAssetType();  
  }

  getraiserequestList() {
    this.raiseRequestService.getAllRaiseRequestList().subscribe(result => {
      this.raiseRequest = result;
      // this.assetTypeNames = this.assetType.map(a => a.assettypename.toLowerCase());
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the asset type Details');
      });
  }
  getAssetTypeList() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetType = result;
      this.getraiserequestList();
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the asset type Details');
      };
  }

  openCreate() {
    const modalRef = this.modalService.open(RaiseRequestCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    // modalRef.componentInstance.assetTypeNames = this.assetTypeNames;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getraiserequestList();
      }
    });
  }

  openEdit(raiseRequest: AssetRaiseRequest) {
    const modalRef = this.modalService.open(RaiseRequestEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.raiseRequestId = raiseRequest;
    // modalRef.componentInstance.assetTypeNames = this.assetTypeNames.filter(v => v !== assetType.assettypename.toLowerCase());
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getraiserequestList();
      }
    });
  }

  openViewList(raiseRequest: AssetRaiseRequest) {
    const modalRef = this.modalService.open(RaiseRequestViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.assetType = raiseRequest;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getraiserequestList();
      }
    });
  }

  delete(raiseRequest: AssetRaiseRequest) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the raise request ${raiseRequest.requestFor}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.raiseRequestService.delete(raiseRequest.id).subscribe(() => {
          this.toastr.showSuccessMessage('The raise request deleted successfully!');
          this.getraiserequestList();
        });
      }
    });
  }
}