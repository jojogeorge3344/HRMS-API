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

@Component({
  selector: 'hrms-adoc-entry-create',
  templateUrl: './adoc-entry-create.component.html',
  styleUrls: ['./adoc-entry-create.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class AdocEntryCreateComponent implements OnInit {

  addForm: FormGroup;
  documentReturnTypeKeys: number[];
  documentUpdateTypeKeys:number[];
  documentTypeKeys:number[]
  documentTypeList = DocumentType;
  statusTypeList=AdocStatusType;
  employeeList;
  currency:any[];
  statusTypes;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private employeeService:EmployeeService,
    private payGroupService: PayGroupService,

  ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.documentTypeKeys = Object.keys(this.documentTypeList).filter(Number).map(Number);
    this.statusTypes=Object.keys(this.statusTypeList).filter(Number).map(Number);
   this.employeeService.getAll()
   .subscribe((result)=>{
    this.employeeList=result
   })
   this.payGroupService.getCurrencies()
    .subscribe((result)=>{
      this.currency=result;
    })
  }

  onSubmit(){
    debugger
    if(this.addForm.invalid){
      return
    }
      if(this.addForm.value.status=="Active"){
        this.addForm.value.status=true
        }else{
          this.addForm.value.status=false
        }

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: ['', [
        Validators.required,
      ]],
      date: ['', [
        Validators.required,
      ]],
      status:['', [
        Validators.required,
      ]],
      isAddition: ['', [
        Validators.required,
      ]],
      amount: ['', [
        Validators.required
      ]],
      remarks: ['', [
      ]],
      currencyId:[null]
     });
  }

}
