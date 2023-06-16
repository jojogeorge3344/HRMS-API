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
    this.getSalaryStructure()
    this.getPayslipComponentById()
  }

getPayslipComponentById(){
  debugger
  this.payslipComponentsService.getPayslipComponentById(this.listItem.id)
  .subscribe((result) => {
    this.payslipComponentDetails = result[0];
    this.editForm.patchValue(this.payslipComponentDetails);
    


    
    this.editForm.patchValue({
      // payslipSettingDetails:selectedIds
    })

  })

}
  getSalaryStructure() {
    this.isLoading=true;
    this.payslipComponentsService.getSalaryStructure()
      .subscribe((result) => {
        let temp = { id: undefined, name: 'test', isLastRow: true }
        // lastrow
        this.salaryStructureList = [...result, temp];
        // this.salaryStructObj = this.salaryStructureList.find((item) => this.editForm.get('structureId').value == item.id)
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
    if (this.editForm.invalid) {
      return
    }
      this.payslipComponentsService.add(this.editForm.value).subscribe((result) => {
        if (result) {
          this.toastr.showSuccessMessage('Paysli component added successfully!');
          this.activeModal.close('submit');
        }
      },
      );

    }

  selectSalaryStructure(args){
    debugger
    this.editForm.patchValue({
      structureId: args.value.id,
    })
    this.salaryStructObj = this.salaryStructureList.find((item) => this.editForm.get('structureId').value == item.id)
    this.getBenefitCode(this.salaryStructObj.id)
    this.editForm.patchValue({
      payslipSettingDetails:null 
    }
    )
  }
  selectBenefitCode(args){
    debugger
    var data = args
    var q = this.editForm.controls.payslipSettingDetails.value 
    // this.addForm.patchValue({
    //   payslipSettingDetails: args.value.id,
    // }) 
  }
  refreshSalaryStructure(event){
    event.stopPropagation();
    event.preventDefault();
    this.getSalaryStructure();
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
      ]],
    });
  }


}
