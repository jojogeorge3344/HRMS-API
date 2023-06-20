import { Component, OnInit,Input } from '@angular/core';
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
  selector: 'hrms-payslip-components-view',
  templateUrl: './payslip-components-view.component.html',
  styleUrls: ['./payslip-components-view.component.scss']
})
export class PayslipComponentsViewComponent implements OnInit {
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
    this.getPayslipComponentById()
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
  

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:this.listItem.id,
      code: [null, [
        Validators.required,
      ]],
      name: [null, [
        Validators.required,
      ]],

      structureId: [null],
      isActive: [true, [
      ]],
      payslipSettingDetails: [null],
      payslipOrderNumber: [null, [
      ]],
    });
  }

}
