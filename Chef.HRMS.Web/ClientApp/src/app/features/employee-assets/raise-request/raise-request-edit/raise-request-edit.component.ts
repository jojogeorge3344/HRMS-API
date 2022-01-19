import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

@Component({
  selector: 'hrms-raise-request-edit',
  templateUrl: './raise-request-edit.component.html'
})
export class RaiseRequestEditComponent implements OnInit {
 
  @Input() raiseRequestDetails : AssetRaiseRequest;
  editForm: FormGroup;
  currentUserId: number;
  assetTypeArray: AssetType[];
  raiseRequestKeys: number[];
  raiseRequesttype = RequestFor;
  raiseRequestStatus = AssetStatus;
  isDisable = false;
  raiseRequestEditData: AssetRaiseRequest;

  constructor( private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

   }

   ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    if (this.raiseRequestDetails.requestFor==1) {
      this.isDisable = true;
    }
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    this.editForm.patchValue(this.raiseRequestDetails);
  }

  get name() { return this.editForm.get('name'); }
  

  onSubmit() {
    this.raiseRequestEditData = this.editForm.getRawValue();
    this.raiseRequestEditData.status= this.raiseRequestStatus.Requested;
    this.raiseRequestEditData.empId = this.currentUserId;
    this.raiseRequestEditData.id = this.raiseRequestDetails.id;
    console.log(this.raiseRequestEditData);
    
    this.raiseRequestService.update(this.raiseRequestEditData).subscribe((result: any) => {
      console.log("res", result)
      if (result.id === -1) {
        this.toastr.showErrorMessage('Raised request already exists!');
      } else {
        this.toastr.showSuccessMessage('Request added successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the request');
      });

  }

  getvalue(i) { // self or team member
      if (this.editForm.value.requestFor == '1') {
      this.isDisable = true;
      this.editForm.get("nameOfTeamMember").setValidators(null)
    }
    else {
      this.isDisable = false;
      this.editForm.get("nameOfTeamMember").setValidators([Validators.required])
    }
  }

  getAllAssetTypes() { // to get asset type list
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypeArray = result;
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the AssetType');
      };
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      requestNo: ['', [
        Validators.required,

      ]],
      requestType: [{ value: 'New Asset', disabled: true }, [
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
    });
  }

}
