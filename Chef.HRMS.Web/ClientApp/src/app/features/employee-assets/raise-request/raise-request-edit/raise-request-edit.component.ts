import * as _ from 'lodash';
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
  raiseRequestStatus = AssetStatus;
  isDisable = false;
  raiseRequestEditData: AssetRaiseRequest;
  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('nameOfTeamMember')
  nameOfTeamMember: ElementRef;

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
    }
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    
  }

  get name() { return this.editForm.get('name'); }
  

  onSubmit() {
    this.raiseRequestEditData = this.editForm.getRawValue();
    this.raiseRequestEditData.nameOfTeamMember = this.editForm.controls['nameOfTeamMember'].value.empid;
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
    if (!this.editForm.controls['nameOfTeamMember'].value) {
      this.editForm.controls['nameOfTeamMember'].reset()
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
      this.editForm.patchValue({nameOfTeamMember:_.find(this.employeeList,['empid',this.raiseRequestDetails.nameOfTeamMember])}) 
    },
      error => {
        console.error(error);
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
