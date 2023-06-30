import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@features/employee/employee.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AdocStatusType } from 'src/app/models/common/types/adocStatusType';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { AdocEntryService } from '../adoc-entry-service';

@Component({
  selector: 'hrms-adoc-entry-view',
  templateUrl: './adoc-entry-view.component.html',
  styleUrls: ['./adoc-entry-view.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class AdocEntryViewComponent implements OnInit {

  viewForm: FormGroup;
  statusTypeList=AdocStatusType;
  benefitTypes:any[];
  employee;
  adhocObj;
  @Input() listItem;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private adocEntryService:AdocEntryService,
    private employeeService:EmployeeService,

  ) { }

  ngOnInit(): void {
    debugger
    this.viewForm = this.createFormGroup();
    debugger
    this.viewForm.patchValue(this.listItem);
   this.getAdhocBfCode()
    this.listItem.date = new Date(this.listItem.date);    
    this.viewForm.patchValue(this.listItem);
    if(this.listItem.status==1){
      this.viewForm.patchValue({
        status:'pending'
      })
    }else if(this.listItem.status==2){
      this.viewForm.patchValue({
        status:'approved'
      })
    }else{
      this.viewForm.patchValue({
        status:'processed'
      })
    }
  }

  getAdhocBfCode()
  {
    this.adocEntryService.getAdhocBfCode()
    .subscribe((result) =>{
      this.adhocObj=result.find((item)=>this.viewForm.get('payrollComponentId').value==item.id)
      this.viewForm.patchValue({
        payrollComponentId:this.adhocObj.name
      })
    })
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [null, [
        Validators.required,
      ]],
      employeeName: [null, [   
      Validators.required,

      ]],
      employeeCode: [null, [
        Validators.required,
      ]],
      payrollComponentId: [null, [
        Validators.required,
      ]],
      date: [null, [
        Validators.required,
      ]],
      status:['pending', [
      ]],
      adhocBFCode: [null, [
        Validators.required,
      ]],
      isAddition: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required
      ]],
      remarks: [null, [
      ]],
     });
  }

}
