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
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-adoc-entry-create',
  templateUrl: './adoc-entry-create.component.html',
  styleUrls: ['./adoc-entry-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
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
  empObj;
  adhocObj;
  isLoading=false;
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
  }


  getEmployeeList() {
    this.isLoading=true;
    this.employeeService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, firstName: 'test', isLastRow: true }
        // lastrow
        this.employeeList = [...result, temp];
        this.isLoading=false;
      })
  }

  getAdhocBfCode(){
    this.isLoading=true;
    this.adocEntryService.getAdhocBfCode()
    .subscribe((result) =>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.adhoc = [...result, temp];
      this.isLoading=false;
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

     let filterdata= this.adhoc.filter(x=>x.id==this.addForm.value.payrollComponentId)
     if(filterdata[0].code=='SE'){
      this.addForm.patchValue({
        isAddition:true,
      })
    }else{
      this.addForm.patchValue({
        isAddition:false,
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
  selectEmployee(args){
    debugger
    this.addForm.patchValue({
      employeeId: args.value.id,
      employeeCode:args.value.employeeNumber,
      employeeName:args.value.firstName
    })
  }
  refreshEmployee(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeList();
  }

selectAhoc(args){
  this.addForm.patchValue({
    payrollComponentId: args.value.id,
  })

}
refreshAdhoc(event){
  event.stopPropagation();
  event.preventDefault();
  this.getAdhocBfCode()
}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [null, [
        Validators.required,
      ]],
      payrollComponentId: [null, [
        Validators.required,
      ]],

      date: [null, [
        Validators.required,
      ]],
      status: ['pending', [
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
