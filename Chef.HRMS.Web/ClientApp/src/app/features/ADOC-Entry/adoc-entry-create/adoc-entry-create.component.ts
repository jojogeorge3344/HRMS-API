import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@features/employee/employee.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AdocStatusType } from 'src/app/models/common/types/adocStatusType';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { AdocEntryService } from '../adoc-entry-service';
import { result } from 'lodash';

@Component({
  selector: 'hrms-adoc-entry-create',
  templateUrl: './adoc-entry-create.component.html',
  styleUrls: ['./adoc-entry-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AdocEntryCreateComponent implements OnInit {

  addForm: FormGroup;
  documentReturnTypeKeys: number[];
  documentUpdateTypeKeys: number[];
  documentTypeKeys: number[]
  documentTypeList = DocumentType;
  statusTypeList = AdocStatusType;
  employeeList;
  currency: any[];
  adhoc:any[]
  statusTypes;
  benefitTypes: any[];
  employee;
  config;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private adocEntryService: AdocEntryService,
    private employeeService: EmployeeService,

  ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getEmployeeList()
    this.getBenefitTypes()
    this.getAdhocBfCode()
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };

  }

  selectionChanged(args) {
    this.addForm.get("employeeId").patchValue(args.value.id);
  }

  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
      })
  }

  getAdhocBfCode()
  {
    this.adocEntryService.getAdhocBfCode()
    .subscribe((result) =>{
      this.adhoc = result;
    })
  }

  getBenefitTypes() {
    this.adocEntryService.getBenefitTypes()
      .subscribe((result) => {
        this.benefitTypes = result;
      })
  }

  onSubmit() {
    if (this.addForm.invalid) {
      return
    }
    else {
      if(this.addForm.get('status').value=='pending'){
        this.addForm.patchValue({
          status:1
        })
      }else if(this.addForm.get('status').value=='approved'){
        this.addForm.patchValue({
          status:2
        })
      }else{
        this.addForm.patchValue({
          status:3
        })
      }     this.employee= this.employeeList.find((item)=>this.addForm.get('employeeId').value==item.id)
     this.addForm.patchValue({
      employeeName:this.employee.firstName,
      employeeCode:this.employee.employeeNumber
     })


     let filterdata= this.adhoc.filter(x=>x.id==this.addForm.value.adhocBFCode)
      if(filterdata[0].code=='SE'){
        this.addForm.patchValue({
          isAddition:true,
          payrollComponentId:this.addForm.value.adhocBFCode
        })
      }else{
        this.addForm.patchValue({
          isAddition:false,
          payrollComponentId:this.addForm.value.adhocBFCode
        })
      }
      this.adocEntryService.add(this.addForm.value).subscribe((result) => {
        if (result) {
          this.toastr.showSuccessMessage('ADOC Entry added successfully!');
          this.activeModal.close('submit');
        }
      },
      );

    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [null, [
        Validators.required,
      ]],
      payrollComponentId: [null],

      date: [null, [
        Validators.required,
      ]],
      status: ['pending', [
      ]],
      adhocBFCode: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required
      ]],
      remarks: [null, [
      ]],
      isAddition:[null, [
      ]],
      employeeName:[null, [
      ]],
      employeeCode:[null, [
      ]],
    });
  }
  changeadhoc(event){
    debugger
    console.log("event",event)
  }
}
