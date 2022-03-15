import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { RequestType } from 'src/app/models/common/types/requesttype';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

import * as _ from 'lodash';

@Component({
  selector: 'hrms-raise-request-view',
  templateUrl: './raise-request-view.component.html'
})
export class RaiseRequestViewComponent implements OnInit {

  viewForm: FormGroup;
  @Input() raiseRequestDetails : AssetRaiseRequest;
  currentUserId: number;
  assetTypeArray: AssetType[];
  raiseRequestKeys: number[];
  raiseRequesttype = RequestFor;
  raiseRequestTypeList = RequestType;
  raiseRequestStatus =AssetStatus;
  isDisable = false;

  constructor(private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) { }

  ngOnInit(): void {
    console.log(this.raiseRequestDetails,"blabla");
    this.currentUserId = getCurrentUserId();
    this.viewForm = this.createFormGroup();
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    this.viewForm.patchValue(this.raiseRequestDetails);
    this.viewForm.patchValue({requestedDate : new DatePipe('en-US').transform(this.raiseRequestDetails.requestedDate, 'yyyy-MM-dd')})
    this.viewForm.patchValue({requestFor:this.raiseRequesttype[this.raiseRequestDetails.requestFor]});
    if(this.raiseRequestDetails.requestFor==1){
      this.viewForm.patchValue({nameOfTeamMember:null})
    }
    this.viewForm.patchValue({requestType: this.raiseRequestTypeList[this.raiseRequestDetails.requestType]}) 
  }
  getvalue(i) { // self or team member
    console.log(this.viewForm.value.requestFor);
    if (this.viewForm.value.requestFor == '1') {
      this.isDisable = true;
      this.viewForm.get("nameOfTeamMember").setValidators(null)
    }
    else {
      this.isDisable = false;
      this.viewForm.get("nameOfTeamMember").setValidators([Validators.required])
    }
  }

  getAllAssetTypes() { // to get asset type list
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypeArray = result;
      this.viewForm.patchValue({assetTypeId: _.find(this.assetTypeArray,['id',this.raiseRequestDetails.assetTypeId]).assettypename});
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Fetch the Asset Type');
      };
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      
      requestNo: ['', [
        Validators.required,

      ]],
      requestType: [{ disabled: true }, [
        Validators.required,
      ]],
      requestedDate: ['', [
        Validators.required,

      ]],
      requestFor: ['', [
        Validators.required,

      ]],
      nameOfTeamMember: ['', [
    
      ]],
      assetTypeId: ['', [
        Validators.required,

      ]],
      description: ['', [
        Validators.required,

      ]],
      reason: ['', [
        Validators.required,

      ]],
    });
  }

}
