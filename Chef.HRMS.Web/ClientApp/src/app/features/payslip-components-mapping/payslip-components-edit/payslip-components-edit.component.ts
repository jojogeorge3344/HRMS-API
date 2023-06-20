import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'hrms-payslip-components-edit',
  templateUrl: './payslip-components-edit.component.html',
  styleUrls: ['./payslip-components-edit.component.scss']
})
export class PayslipComponentsEditComponent implements OnInit {
  editForm: FormGroup;
  benefitTypes: any[];
  employee;
  salaryStructObj;
  isLoading=false;
  salaryStructureList;
  benefitList;
  selectedBenefitcode;
  isDuplicate: boolean = false;
  payslipComponentDetailsList;
  @Input() listItem;
  payslipComponentDetails:any=[];
  constructor(
    public activeModal: NgbActiveModal,
    private payslipComponentsService: PayslipComponentsService,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    this.getPayslipComponentById()
    this.getAll()
    //this.getSalaryStructure()

  }

getPayslipComponentById(){
  debugger
  this.payslipComponentsService.getPayslipComponentById(this.listItem.id)
  .subscribe((result) => {
    this.payslipComponentDetails = result;
    this.editForm.patchValue(this.payslipComponentDetails);
    this.getSalaryStructure()
  //  this.selectedBenefitcode= this.payslipComponentDetails.payslipSettingDetails

  })

}
  getSalaryStructure() {
    debugger
    this.isLoading=true;
    this.payslipComponentsService.getSalaryStructure()
      .subscribe((result) => {
        this.isLoading=false;
        let temp = { id: undefined, name: 'test', isLastRow: true }
        // lastrow
        this.salaryStructureList = [...result, temp];
        this.salaryStructObj = this.salaryStructureList.find((item) => this.editForm.get('structureId').value == item.id)

        this.getBenefitCode(this.editForm.get('structureId').value)

      })
  }
  getBenefitCode(id){
    debugger
    this.payslipComponentsService.getBenefitCode(id)
    .subscribe((result) => {
      result.map((element:any)=>{ element['payrollComponentId'] = element.id; element.id= 0 ;element['payslipSettingId'] = '0';} )
      this.benefitList=result
      // this.editForm.patchValue({
      //   payslipSettingDetails:this.payslipComponentDetails.payslipSettingDetails
      // })
    })
  }
  getAll() {
    debugger
    this.payslipComponentsService.getAll()
      .subscribe((result) => {
        this.payslipComponentDetailsList = result
       
      })
  }
  onSubmit() {
    debugger
    if (this.editForm.invalid || this.isDuplicate) {
      return
    }
    let item= this.payslipComponentDetailsList.find((item) => this.editForm.get('structureId').value == item.structureId)
    if(item?.payslipOrderNumber==this.editForm.get('payslipOrderNumber').value){
        this.toastr.showWarningMessage(" payslip order number already exist");
        return
    }

      this.payslipComponentsService.update(this.editForm.value).subscribe((result) => {
          this.toastr.showSuccessMessage('Payslip component details updated successfully!');
          this.activeModal.close('submit');
     
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Update Payslip component details');
      }
      );

    }

  selectSalaryStructure(args){
    debugger
    this.editForm.patchValue({
      structureId: args.value.id,
      
    })
    this.editForm.patchValue({
      payslipSettingDetails:null 
    }
    )

    this.salaryStructObj = this.salaryStructureList.find((item) => this.editForm.get('structureId').value == item.id)
    this.getBenefitCode(this.salaryStructObj.id)
  }
  selectBenefitCode(args){
    // this.editForm.patchValue({
    //   payslipSettingDetails: args.value.id,
    // }) 
  }
  refreshSalaryStructure(event){
    event.stopPropagation();
    event.preventDefault();
    this.getSalaryStructure();
  }
  codeExist(){
    debugger
    this.isCodeExists(this.editForm.get('code').value)
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
      id:this.listItem.id,
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
