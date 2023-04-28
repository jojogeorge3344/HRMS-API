
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
  selector: 'hrms-adoc-entry-edit',
  templateUrl: './adoc-entry-edit.component.html',
  styleUrls: ['./adoc-entry-edit.component.scss']
})
export class AdocEntryEditComponent implements OnInit {


  editForm: FormGroup;
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
    this.editForm = this.createFormGroup();
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
    if(this.editForm.invalid){
      return
    }
      if(this.editForm.value.status=="Active"){
        this.editForm.value.status=true
        }else{
          this.editForm.value.status=false
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
     });
  }

}
