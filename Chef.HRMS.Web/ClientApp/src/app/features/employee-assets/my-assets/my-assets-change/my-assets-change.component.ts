import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { MyAssets } from '../my-assets.model';
import { MyAssetsService } from '../my-assets.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetChangeType } from 'src/app/models/common/types/assetchangetype';
import { toNumber } from 'lodash';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'hrms-my-assets-change',
  templateUrl: './my-assets-change.component.html'
})
export class MyAssetsChangeComponent implements OnInit {

  changeTypeKeys: number[];
  changeType = AssetChangeType;
  changeTypeSelected: string;
  changeAssetForm: FormGroup;
  assetStatus = AssetStatus;
  requestFor = RequestFor;
  requestType = RequestType;
  raiseRequestData: any = {};

  @Input() assetData: MyAssets;
  @Input() currentUserId: number;

  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private myAssetService: MyAssetsService) { }

  ngOnInit(): void {
    this.changeAssetForm = this.createFormGroup();
    this.changeTypeKeys = Object.keys(this.changeType).filter(Number).map(Number);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      changeTypeOptions: [null, Validators.required],
      changeDescription: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
    });
  }
 
  onSubmit() {
    this.changeTypeSelected = this.changeAssetForm.get('changeTypeOptions').value;
    this.assetData.status = this.assetStatus.ChangeRequest;
    this.assetData.changeDescription = this.changeAssetForm.get('changeDescription').value;
    this.assetData.changeType = toNumber(this.changeTypeSelected);
    this.raiseRequestData.requestedDate = new Date();
    this.raiseRequestData.requestFor = this.requestFor.Self;
    this.raiseRequestData.requestType = this.requestType.ChangeAsset;
    this.raiseRequestData.assetTypeId = this.assetData.assetTypeId;
    this.raiseRequestData.assetTypeName=this.assetData.assetTypeName;
    this.raiseRequestData.status = this.assetStatus.ChangeRequest;
    this.raiseRequestData.empId = this.currentUserId;
    this.raiseRequestData.assetid = this.assetData.assetId;
    this.raiseRequestData.nameOfTeamMemberId = this.currentUserId;
    console.log(this.raiseRequestData,this.assetData);
    forkJoin([
      this.myAssetService.updateStatus(this.assetData),
      // this.myAssetService.insertRequest(this.raiseRequestData)
    ]).subscribe(([upRes]) => {
      this.toastr.showSuccessMessage('Request submitted successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit change request.');
      });
    }
}





