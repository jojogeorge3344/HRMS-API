import * as _ from 'lodash';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { ThrowStmt } from '@angular/compiler';
import { Employee } from '@features/employee/employee.model';
import { AssetStatus } from 'src/app/models/common/types/assetstatus';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { EmployeeLeaveService } from '@features/employee-leave/employee-leave.service';
import { EmployeeService } from '@features/employee/employee.service';
import { RequestFor } from 'src/app/models/common/types/requestfor';


@Component({
  selector: 'hrms-raise-request-create',
  templateUrl: './raise-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class RaiseRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  current = new Date();
  todaysDate: Date;
  assetTypeArray: AssetType[];
  raiseRequestKeys: number[];
  raiseRequesttype = RequestFor;
  raiseRequestStatus =AssetStatus;
  raiseRequestDetails : AssetRaiseRequest;
  isDisable = false;
  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('nameOfTeamMemberId')
  nameOfTeamMemberId: ElementRef;

  
  constructor(
    private raiseRequestService: RaiseRequestService,
    private assetTypeService: AssetTypeService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {

  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getEmployeeList();
    this.addForm = this.createFormGroup();
    this.getAllAssetTypes();
    this.raiseRequestKeys = Object.keys(this.raiseRequesttype).filter(Number).map(Number);
    console.log(this.currentUserId);
  }

  get name() { return this.addForm.get('name'); }
  

  onSubmit() {
  
    this.raiseRequestDetails = this.addForm.getRawValue();
    this.raiseRequestDetails.nameOfTeamMemberId = this.addForm.controls['nameOfTeamMemberId'].value?this.addForm.controls['nameOfTeamMemberId'].value.empid: this.currentUserId;
    this.raiseRequestDetails.empId = this.currentUserId;
    this.raiseRequestDetails.status= this.raiseRequestStatus.Requested;
    // this.raiseRequestDetails.assetTypeName=_.find(this.assetTypeArray, ['id', this.addForm.controls['assetTypeId'].value]).assettypename;
    
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

  checkTeammemberName(){

    if (!this.addForm.controls['nameOfTeamMemberId'].value) {
      this.addForm.controls['nameOfTeamMemberId'].reset()
    }
  }


  formatter = (employee) => employee.employeecode;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter((employee:any) => new RegExp(term, 'mi').test(employee.employeecode)).slice(0, 10))
  )

  // selected($event) {
  //   $event.preventDefault();
  //   if (this.selectedItems.indexOf($event.item) === -1) {
  //     this.selectedItems.push($event.item);
  //   }
  //   this.nameOfTeamMemberId.nativeElement.value = '';
  // }

  // remove(item) {
  //   this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
  // }

  getEmployeeList() {
    this.raiseRequestService.getEmployeeDetails().subscribe(result => {
      let currentDepartment = _.find(result,['empid',this.currentUserId]).department
      console.log(currentDepartment,"bllll");
      
      this.employeeList = result.filter(employee => (employee.empid !== this.currentUserId && employee.department == currentDepartment));      
    },
      error => {
        console.error(error);
      });
  }

  getvalue(i) { // self or team member
    console.log(this.addForm.value.requestFor);
    if (this.addForm.value.requestFor == '1') {
      this.isDisable = true;
      this.addForm.get("nameOfTeamMemberId").setValidators(null)
    }
    else {
      this.isDisable = false;
      this.addForm.get("nameOfTeamMemberId").setValidators([Validators.required])
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
