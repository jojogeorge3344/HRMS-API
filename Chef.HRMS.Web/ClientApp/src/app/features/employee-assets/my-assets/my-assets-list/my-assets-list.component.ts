import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { MyAssets } from '../my-assets.model';
import { MyAssetsChangeComponent } from '../my-assets-change/my-assets-change.component';
import { MyAssetsViewComponent } from '../my-assets-view/my-assets-view.component';
import { MyAssetsReturnComponent } from '../my-assets-return/my-assets-return.component';
import { MyAssetsService } from '../my-assets.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';


@Component({
  selector: 'hrms-my-assets-list',
  templateUrl: './my-assets-list.component.html'
})
export class MyAssetsListComponent implements OnInit {

  myAssetList: MyAssets[];
  currentUserId;

  constructor(
    private myAssetservice: MyAssetsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getAllMyAssetList(this.currentUserId);
  }

  getAllMyAssetList(userId) {
    // this.myAssetservice.getAllMyAssetList(userId).subscribe(result => {
    //   this.myAssetList = result;
    //   //this.getAssetMetadataList();
    // }),
    //   error => {
    //     console.error(error);
    //     this.toastr.showErrorMessage('Unable to fetch the asset type Details');
    //   };
  }

  openView(myAsset:MyAssets) {
    const modalRef = this.modalService.open(MyAssetsViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.myAsset = myAsset;
    // modalRef.result.then((result) => {
    //   if (result == 'submit') {
    //     this.getAllMyAssetList();
    //   }
    //   else {
    //     this.getAllMyAssetList();
    //   }
    // });
  }

  openChange() {
    // const modalRef = this.modalService.open(AssetMetadataEditComponent,
    //   { size: 'lg', centered: true, backdrop: 'static' });
    // modalRef.componentInstance.assetTpId = assettypeid;
    // modalRef.componentInstance.assetTpName = assettypename;
    // modalRef.componentInstance.metaData = metadata;
    // modalRef.result.then((result) => {
    //   if (result == 'submit') {
    //     this.getAssetTypeList();
    //   }
    //   else {
    //     this.getAssetTypeList();
    //   }
    // });
  }

  openReturn() {
    // const modalRef = this.modalService.open(AssetMetadataEditComponent,
    //   { size: 'lg', centered: true, backdrop: 'static' });
    // modalRef.componentInstance.assetTpId = assettypeid;
    // modalRef.componentInstance.assetTpName = assettypename;
    // modalRef.componentInstance.metaData = metadata;
    // modalRef.result.then((result) => {
    //   if (result == 'submit') {
    //     this.getAssetTypeList();
    //   }
    //   else {
    //     this.getAssetTypeList();
    //   }
    // });
  }

}
