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


@Component({
  selector: 'hrms-my-assets-change',
  templateUrl: './my-assets-change.component.html'
})
export class MyAssetsChangeComponent implements OnInit {

  changeTypeKeys: number[];
  changeType = AssetChangeType;
  changeTypeSelected: string;
  changeAssetForm: FormGroup;
  assetStatus=AssetStatus;

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
    console.log(this.changeTypeSelected);
    
    // this.assetData.status="CR";
    this.assetData.description=this.changeAssetForm.get('description').value;
    this.assetData.changeType=toNumber(this.changeTypeSelected);
    this.myAssetService.updateStatus(this.assetData).subscribe(result => {
      this.toastr.showSuccessMessage('Change request submitted successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to submit change request.');
      });
    }
}





