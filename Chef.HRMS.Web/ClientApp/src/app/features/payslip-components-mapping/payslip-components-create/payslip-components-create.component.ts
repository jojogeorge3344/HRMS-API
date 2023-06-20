import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '@features/employee/employee.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { AdocStatusType } from 'src/app/models/common/types/adocStatusType';
import { DocumentType } from 'src/app/models/common/types/documentType';
import { result } from 'lodash';
import { PayslipComponentsService } from '../payslip-components-service';
import { element } from 'protractor';

@Component({
  selector: 'hrms-payslip-components-create',
  templateUrl: './payslip-components-create.component.html',
  styleUrls: ['./payslip-components-create.component.scss']
})
export class PayslipComponentsCreateComponent implements OnInit {
 
  addForm: FormGroup;
  benefitTypes: any[];
  employee;
  salaryStructObj;
  isLoading=false;
  salaryStructureList;
  benefitList;
  selectedBenefitcode;
  isDuplicate: boolean = false;
  payslipComponentDetails;
  constructor(
    public activeModal: NgbActiveModal,
    private payslipComponentsService: PayslipComponentsService,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getSalaryStructure()
    this.getAll()
  }

  getAll() {
    debugger
    this.payslipComponentsService.getAll()
      .subscribe((result) => {
        this.payslipComponentDetails = result
       
      })
  }
  getSalaryStructure() {
    this.isLoading=true;
    this.payslipComponentsService.getSalaryStructure()
      .subscribe((result) => {
        let temp = { id: undefined, name: 'test', isLastRow: true }
        // lastrow
        this.salaryStructureList = [...result, temp];
        this.isLoading=false;
      })
  }
  getBenefitCode(id){
    debugger
    this.payslipComponentsService.getBenefitCode(id)
    .subscribe((result) => {
      result.map((element:any)=>{ element['payrollComponentId'] = element.id; element.id= 0 ;element['payslipSettingId'] = '0';} )
      this.benefitList=result
    })
  }
  onSubmit() {
    debugger
    if (this.addForm.invalid || this.isDuplicate) {
      return
    }
    let item = this.payslipComponentDetails.find((item) => this.addForm.get('structureId').value == item.structureId)
    if(item?.payslipOrderNumber==this.addForm.get('payslipOrderNumber').value){
        this.toastr.showWarningMessage(" payslip order number already exist");
        return
    }else{
      this.payslipComponentsService.add(this.addForm.value).subscribe((result) => {
        if (result) {
          this.toastr.showSuccessMessage('Payslip component details added successfully!');
          this.activeModal.close('submit');
        }
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Update Payslip component details');
      }
      );
    }
     

    }

  selectSalaryStructure(args){
    debugger
    this.addForm.patchValue({
      structureId: args.value.id,
    })
    this.salaryStructObj = this.salaryStructureList.find((item) => this.addForm.get('structureId').value == item.id)
    this.getBenefitCode(this.salaryStructObj.id)
    this.addForm.patchValue({
      payslipSettingDetails:null 
    }
    )
  }
  selectBenefitCode(args){
    // this.addForm.patchValue({
    //   payslipSettingDetails: args.value.id,
    // }) 
  }
  refreshSalaryStructure(event){
    event.stopPropagation();
    event.preventDefault();
    this.getSalaryStructure();
  }
  codeExist(){
    this.isCodeExists(this.addForm.get('code').value)
  }
  isCodeExists(code: string) {
    this.payslipComponentsService
      .isCodeExist(code)
      .subscribe((result) => {
        if (result) {
          this.isDuplicate = true;
        } else {
          this.isDuplicate = false;
        }
      });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      code: [null, [
        Validators.required,
      ]],
      name: [null, [
        Validators.required,
      ]],

      structureId: [null, [
        Validators.required,
      ]],
      isActive: [true, [
      ]],
      payslipSettingDetails: [null, [
        Validators.required
      ]],
      payslipOrderNumber: [null, [
        Validators.required
      ]],
    });
  }

}
