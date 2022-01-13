import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { RaiseRequestService } from '../raise-request.service';
import { AssetRaiseRequest } from '../../raise-request/raise-request.model';
import { AssetType } from '../../../settings/asset/asset-type/asset-type.model';
import { AssetTypeService } from '../../../settings/asset/asset-type/asset-type.service';
import { RaiseRequestFor } from 'src/app/models/common/types/raiserequestfor';
import { ThrowStmt } from '@angular/compiler';
import { Employee } from '@features/employee/employee.model';
import { EmployeeService } from '@features/employee/employee.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'hrms-raise-request-create',
  templateUrl: './raise-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class RaiseRequestCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  @Input() requestId: any;
  @Input() assetTypeNames: string[];
  current = new Date();
  todaysDate: Date;
  assetTypeArray: AssetType[];
  raiseRequestKeys: number[];
  raiseRequesttype = RaiseRequestFor;
  isDisable = false;

  employeeList: Employee[];
  selectedItems = [];
  @ViewChild('notifyPersonnel')
  notifyPersonnel: ElementRef;
  employeeDetails: Employee;

  constructor(
    private raiseRequestService: RaiseRequestService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private assetTypeService: AssetTypeService,
    private employeeService: EmployeeService,
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
    this.raiseRequestService.add(this.addForm.value).subscribe((result: any) => {
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

  getvalue(i) {
    console.log(this.addForm.value.requestFor);
    if (this.addForm.value.requestFor == '1') {
      this.isDisable = true;
    }
    else {
      this.isDisable = false;
    }
  }

  getAllAssetTypes() {
    this.assetTypeService.getAllAssetTypeList().subscribe(result => {
      this.assetTypeArray = result;
    }),
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the AssetType');
      };
  }

  getEmployeeList() {
    this.employeeService.getAll().subscribe(result => {
      this.employeeList = result.filter(employee => employee.id !== this.requestId);
    },
      error => {
        console.error(error);
      });
  }
  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )

  selected($event) {
    $event.preventDefault();
    if (this.selectedItems.indexOf($event.item) === -1) {
      this.selectedItems.push($event.item);
    }
    this.notifyPersonnel.nativeElement.value = '';
  }

  remove(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
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
        Validators.required,

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
