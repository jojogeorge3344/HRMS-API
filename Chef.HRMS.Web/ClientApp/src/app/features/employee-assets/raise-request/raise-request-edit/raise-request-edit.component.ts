import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
import { Employee } from '@features/employee/employee.model';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  raiseRequestTypeList = RequestType;
  raiseRequestStatus = AssetStatus;
  isDisable = false;
  raiseRequestEditData: AssetRaiseRequest;
  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('nameOfTeamMemberId')
  nameOfTeamMemberId: ElementRef;

  constructor( private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

   }

   ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getEmployeeList();
    this.editForm = this.createFormGroup();
    if (this.raiseRequestDetails.requestFor==1) {
      this.isDisable = true;
      // this.editForm.get('nameOfTeamMemberId').disable();
    }
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    
  }

  get name() { return this.editForm.get('name'); }
  

  onSubmit() {
    this.raiseRequestEditData = this.editForm.getRawValue();
    this.raiseRequestEditData.requestType = this.raiseRequestDetails.requestType
    this.raiseRequestEditData.nameOfTeamMemberId =  this.editForm.controls['nameOfTeamMemberId'].value?this.editForm.controls['nameOfTeamMemberId'].value.empid: this.currentUserId;
    this.raiseRequestEditData.status= this.raiseRequestStatus.Requested;
    this.raiseRequestEditData.empId = this.currentUserId;
    // this.raiseRequestEditData.assetTypeName=_.find(this.assetTypeArray, ['id', this.editForm.controls['assetTypeId'].value]).assettypename;
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

  checkTeammemberName(){
    if (!this.editForm.controls['nameOfTeamMemberId'].value) {
      this.editForm.controls['nameOfTeamMemberId'].reset()
    }
  }

  formatter = (employee) => employee.employeecode;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter((employee:any) => new RegExp(term, 'mi').test(employee.employeecode)).slice(0, 10))
  )

  getEmployeeList() {
    this.raiseRequestService.getEmployeeDetails().subscribe(result => {
      let currentDepartment = _.find(result,['empid',this.currentUserId]).department;      
      this.employeeList = result.filter(employee => (employee.empid !== this.currentUserId && employee.department == currentDepartment)); 
      this.editForm.patchValue(this.raiseRequestDetails);    
      this.editForm.patchValue({requestedDate : new DatePipe('en-US').transform(this.raiseRequestDetails.requestedDate, 'yyyy-MM-dd')})
      this.editForm.patchValue({nameOfTeamMemberId:_.find(this.employeeList,['empid',this.raiseRequestDetails.nameOfTeamMemberId])})
      this.editForm.patchValue({requestType: this.raiseRequestTypeList[this.raiseRequestDetails.requestType]}) 
    },
      error => {
        console.error(error);
      });
  }


  getvalue(i) { // self or team member
      if (i === 1) {
      this.isDisable = true;
      this.editForm.get("nameOfTeamMemberId").setValidators(null)
    }
    else {
      this.isDisable = false;
      this.editForm.get("nameOfTeamMemberId").setValidators([Validators.required])
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
      requestType: ['', [
        Validators.required,
      ]],
      requestedDate: ['', [
        Validators.required,

      ]],
      requestFor: ['', [
        Validators.required,

      ]],
      nameOfTeamMemberId: ['', [
    
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
