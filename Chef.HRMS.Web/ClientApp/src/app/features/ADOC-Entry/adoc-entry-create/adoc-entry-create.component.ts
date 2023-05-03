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
  statusTypes;
  benefitTypes: any[];
  employee;
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
  }

  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
      })
  }

  getBenefitTypes() {
    this.adocEntryService.getBenefitTypes()
      .subscribe((result) => {
        this.benefitTypes = result;
      })
  }

  onSubmit() {
    debugger
    if (this.addForm.invalid) {
      return
    }
    else {
      debugger
     this.employee= this.employeeList.find((item)=>this.addForm.get('employeeId').value==item.id)
     this.addForm.patchValue({
      employeeName:this.employee.firstName,
      employeeCode:this.employee.employeeNumber
     })
      if(this.addForm.value.adhocBFCode=='SE'){
        this.addForm.patchValue({
          isAddition:true,
          payrollComponentId:17
        })
      }else{
        this.addForm.patchValue({
          isAddition:false,
          payrollComponentId:25
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

}
