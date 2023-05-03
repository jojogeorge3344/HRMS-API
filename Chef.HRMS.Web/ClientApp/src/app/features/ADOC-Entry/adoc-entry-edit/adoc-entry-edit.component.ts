
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
  selector: 'hrms-adoc-entry-edit',
  templateUrl: './adoc-entry-edit.component.html',
  styleUrls: ['./adoc-entry-edit.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
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
  benefitTypes:any[];
  employee;
  @Input() listItem;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private adocEntryService:AdocEntryService,
    private employeeService:EmployeeService,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    debugger
    this.editForm.patchValue(this.listItem);
    this.getEmployeeList()
    this.getBenefitTypes()
   
    this.listItem.date = new Date(this.listItem.date);    
    this.editForm.patchValue(this.listItem);
    if(this.listItem.status==1){
      this.editForm.patchValue({
        status:'pending'
      })
    }else if(this.listItem.status==2){
      this.editForm.patchValue({
        status:'approved'
      })
    }else{
      this.editForm.patchValue({
        status:'processed'
      })
    }
  }

  getEmployeeList(){
    this.employeeService.getAll()
    .subscribe((result)=>{
     this.employeeList=result
    })
  }

  getBenefitTypes(){
    this.adocEntryService.getBenefitTypes()
    .subscribe((result)=>{
  this.benefitTypes=result;
    })
  }

  onSubmit(){
    if(this.editForm.invalid){
      return
    }
    else{
      debugger
      this.employee= this.employeeList.find((item)=>this.editForm.get('employeeId').value==item.id)
      this.editForm.patchValue({
       employeeName:this.employee.firstName,
       employeeCode:this.employee.employeeNumber
      })
 
      if(this.listItem.status=='pending'){
        this.editForm.patchValue({
          status:1
        })
      }if(this.listItem.status=='approved'){
        this.editForm.patchValue({
          status:2
        })
      }else{
        this.editForm.patchValue({
          status:3
        })
      }
      if(this.editForm.value.adhocBFCode=='SE'){
        this.editForm.patchValue({
          isAddition:true,
          payrollComponentId:17
        })
      }else{
        this.editForm.patchValue({
          isAddition:false,
          payrollComponentId:25
        })
      }
      this.adocEntryService.update(this.editForm.value).subscribe((result)=>{
        if(result){
          this.toastr.showSuccessMessage('The ADOC Entry added successfully!');         
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
      employeeName: [null, [
      ]],
      employeeCode: [null, [
      ]],
      payrollcomponentId: [null, [
        Validators.required,
      ]],
      date: [null, [
        Validators.required,
      ]],
      status:[0, [
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
