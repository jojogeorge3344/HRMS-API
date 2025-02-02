import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';
// import { EmployeeEOSAccrualType } from 'src/app/models/common/employeeEOSAccrualType';
// import { EmployeeEOSpaymentType } from 'src/app/models/common/types/employeeEOSpaymentType';
import { OvertimePolicyCalculationComponent } from '@settings/overtime/overtime-policy-configuration/overtime-policy-calculation/overtime-policy-calculation.component';

@Component({
  selector: 'hrms-eos-create',
  templateUrl: './eos-create.component.html',
  styleUrls: ['./eos-create.component.scss']
})
export class EosCreateComponent implements OnInit {

  addForm: FormGroup;
  EOSAccrualTypeDetails: any;
  EOSPaymentTypeDetails: any
  settlementBfCode;
  isLoading;
  eosPaymentBfCodeObj;

  // componentType: any;
  // employeeEOSAccrualType: object;
  // employeeEOSAccrualTypeKeys: number[];
  // employeeEOSAccrual = EmployeeEOSAccrualType;
  // employeeEOSpaymentType: object;
  // employeeEOSpaymentTypeKeys: number[];
  // employeeEOSpayment = EmployeeEOSpaymentType;

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private eosService:EosService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
  
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getEmployeeEOSAccrualTypeDetail()
    this.getEmployeeEOSpaymentTypeDetail()

   
    // this.employeeEOSAccrualTypeKeys = Object.keys(this.employeeEOSAccrual).filter(Number).map(Number);
    // this.employeeEOSpaymentTypeKeys = Object.keys(this.employeeEOSpayment).filter(Number).map(Number);
  }
  getEmployeeEOSAccrualTypeDetail(){
    this.isLoading=true;
    this.eosService.getEmployeeEOSAccrual().subscribe(res=>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
        this.EOSAccrualTypeDetails = [...res, temp];
        this.isLoading=false
    })
  }
  getEmployeeEOSpaymentTypeDetail(){
    this.isLoading=true;
    this.eosService.getEmployeeEOSpaymentType().subscribe(res=>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
        this.EOSPaymentTypeDetails = [...res, temp];
        this.isLoading=false

    })
  }
  onSubmit() {
    if(this.addForm.value.retrospectiveAccrual=="Yes"){
      this.addForm.value.retrospectiveAccrual=true
      }
      else{
        this.addForm.value.retrospectiveAccrual=false
      }
      if(this.addForm.value.includeLOPDays=="Yes"){
        this.addForm.value.includeLOPDays=true
        }
        else{
          this.addForm.value.includeLOPDays=false
        }
        if(this.addForm.value.includeProbationDays=="Yes"){
          this.addForm.value.includeProbationDays=true
          }
          else{
            this.addForm.value.includeProbationDays=false
          }
    const eosForm = this.addForm.value;
  
    this.eosService.getCode(eosForm.bfCode).subscribe((result)=>{
      if(result){
     this.toastr.showWarningMessage("Already Code Exist")
      }
      else{
        this.eosService.add(eosForm).subscribe(result => {
          this.toastr.showSuccessMessage('The Eos added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the Eos');
    });
      }
    })
  
  }
  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = '';

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.addForm.get(type).patchValue(result);
      }
    });
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['', [Validators.required, Validators.maxLength(30),
      ]],
      bfName: ['', [
        Validators.required, Validators.maxLength(50),
      ]],
      retrospectiveAccrual: [null, [
        Validators.required
      ]],
      includeLOPDays: [null, [
        Validators.required
      ]],
      includeProbationDays: [null, [
        Validators.required
      ]],
      employeeEOSAccrualType: [null, [
        Validators.required
      ]],
      employeeEOSpaymentType: [null, [
        Validators.required
      ]],
      // includedBenefits: ['', [
      //   Validators.required
      // ]],
      
    });
  }
  selectSettlementCode(args){
    this.addForm.patchValue({
      employeeEOSAccrualType:args.value.id,
    })
  }
  selectPaymentBfCode(args){
    this.addForm.patchValue({
      employeeEOSpaymentType:args.value.id,
    })
  }
  refreshBfCode(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeEOSAccrualTypeDetail();
  }
  refreshPaymentBfCode(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeEOSAccrualTypeDetail();
  }
}














