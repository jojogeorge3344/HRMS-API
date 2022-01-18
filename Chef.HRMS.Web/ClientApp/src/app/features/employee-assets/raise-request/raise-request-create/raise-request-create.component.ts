import { Component, OnInit} from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { RequestFor } from 'src/app/models/common/types/requestfor';
import { ThrowStmt } from '@angular/compiler';
import { Employee } from '@features/employee/employee.model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';

@Component({
  selector: 'hrms-raise-request-create',
  templateUrl: './raise-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class RaiseRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  // @Input() assetTypeNames: string[];
  current = new Date();
  todaysDate: Date;
  assetTypeArray: AssetType[];
  raiseRequestKeys: number[];
  raiseRequesttype = RequestFor;
  raiseRequestStatus =AssetStatus;
  // raiseRequestDetails : any = {};
  raiseRequestDetails : AssetRaiseRequest;
  isDisable = false;

  constructor(
    private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    console.log(this.currentUserId);
  }

  get name() { return this.addForm.get('name'); }
  

  onSubmit() {
    // this.raiseRequestDetails.empId = this.currentUserId;
    this.raiseRequestDetails = this.addForm.getRawValue();
    this.raiseRequestDetails.empId = this.currentUserId;
    this.raiseRequestDetails.status= this.raiseRequestStatus.Requested;
    console.log(this.raiseRequestDetails);

    this.raiseRequestService.add(this.raiseRequestDetails).subscribe((result: any) => {
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
    console.log(this.addForm.value.requestFor);
    if (this.addForm.value.requestFor == '1') {
      this.isDisable = true;
      this.addForm.get("nameOfTeamMember").setValidators(null)
    }
    else {
      this.isDisable = false;
      this.addForm.get("nameOfTeamMember").setValidators([Validators.required])
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
      requestType: [{ value: 'New Asset', disabled: true }, [
        Validators.required,
      ]],
      requestedDate: [new Date(Date.now()), [
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
