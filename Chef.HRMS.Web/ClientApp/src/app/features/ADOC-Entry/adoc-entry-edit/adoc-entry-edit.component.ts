
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
  empObj;
  adhocObj;
  selectedDatasource:any;
  adhoc;
  isLoading=false;

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
    this.editForm.patchValue(this.listItem);
    this.getEmployeeList()
    this.getBenefitTypes()
    this.getAdhocBfCode()
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

  selectionChanged(args) {
    this.editForm.get("employeeId").patchValue(args.value.id);
  }


  getEmployeeList(){
    this.isLoading=true;
    this.employeeService.getAll()
    .subscribe((result)=>{
     let temp = { id: undefined, firstName: 'test', isLastRow: true }
     // lastrow
     this.employeeList = [...result, temp];
     this.isLoading=false;
     this.empObj=result.find((item)=>this.editForm.get('employeeId').value==item.id)

    })
  }

  getBenefitTypes(){
    this.adocEntryService.getBenefitTypes()
    .subscribe((result)=>{
  this.benefitTypes=result;
    })
  }
  getAdhocBfCode()
  {
    this.isLoading=true;
    this.adocEntryService.getAdhocBfCode()
    .subscribe((result) =>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
      this.adhoc = [...result, temp];
      this.isLoading=false;
      this.adhocObj=result.find((item)=>this.editForm.get('payrollComponentId').value==item.id)
    })
  }
  onSubmit(){
    debugger
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
 
     
      if(this.editForm.value.adhocBFCode=='SE'){
        this.editForm.patchValue({
          isAddition:true,
        })
      }else{
        this.editForm.patchValue({
          isAddition:false,
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
  selectEmployee(args){
    debugger
    this.editForm.patchValue({
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
  this.editForm.patchValue({
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
      id: [this.listItem.id],
      employeeId: [null, [
        Validators.required,
      ]],
      employeeName: [null, [
      ]],
      employeeCode: [null, [
      ]],
      payrollComponentId: [null, [
        Validators.required
      ]],
      date: [null, [
        Validators.required,
      ]],
      status:['pending', [
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
