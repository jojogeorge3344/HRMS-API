import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { MyAssets } from '../my-assets.model';
import { MyAssetsService } from '../my-assets.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AssetChangeType } from 'src/app/models/common/types/assetChangeType';


@Component({
  selector: 'hrms-my-assets-change',
  templateUrl: './my-assets-change.component.html'
})
export class MyAssetsChangeComponent implements OnInit {

  changeTypeKeys: number[];
  changeType = AssetChangeType;

  constructor( public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private myAssetService:MyAssetsService) { }

  ngOnInit(): void {
    this.changeTypeKeys = Object.keys(this.changeType).filter(Number).map(Number);
  }

}
