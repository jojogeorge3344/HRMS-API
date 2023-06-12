import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';
import { EosGroup } from '../eos.model';
import { EmployeeEOSAccrualType } from 'src/app/models/common/employeeEOSAccrualType';
import { EmployeeEOSpaymentType } from 'src/app/models/common/types/employeeEOSpaymentType';
import { OvertimePolicyCalculationComponent } from '@settings/overtime/overtime-policy-configuration/overtime-policy-calculation/overtime-policy-calculation.component';

@Component({
  selector: 'hrms-eos-edit',
  templateUrl: './eos-edit.component.html',
  styleUrls: ['./eos-edit.component.scss']
})
export class EosEditComponent implements OnInit {

  editForm: FormGroup;
  @Input() relDetails: EosGroup;
  codeExistCheck:boolean=false
  EOSAccrualTypeDetails: any;
  EOSPaymentTypeDetails: any;
  settlementBfCode;
  isLoading;
  eosPaymentBfCodeObj;

  // employeeEOSAccrualType: object;
  // employeeEOSAccrualTypeKeys: number[];
  // employeeEOSAccrual = EmployeeEOSAccrualType;
  // employeeEOSpaymentType: object;
  // employeeEOSpaymentTypeKeys: number[];
  // employeeEOSpayment = EmployeeEOSpaymentType;
  constructor(
    private eosService:EosService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,) {
  }

  ngOnInit(): void {
    this.editForm = this.createFormGroup();
    debugger
    this.editForm.patchValue(this.relDetails);
    this.getEmployeeEOSAccrualTypeDetail()
    this.getEmployeeEOSpaymentTypeDetail()
    // this.employeeEOSAccrualTypeKeys = Object.keys(this.employeeEOSAccrual).filter(Number).map(Number);
    // this.employeeEOSpaymentTypeKeys = Object.keys(this.employeeEOSpayment).filter(Number).map(Number);
    if(this.editForm.value.retrospectiveAccrual==true){
      this.editForm.patchValue({
        retrospectiveAccrual:"Yes",
      })
      
      }else{
        this.editForm.patchValue({
          retrospectiveAccrual:"No",
        })
      }
      if(this.editForm.value.includeLOPDays==true){
        this.editForm.patchValue({
          includeLOPDays:"Yes",
        })
        
        }else{
          this.editForm.patchValue({
            includeLOPDays:"No",
          })
        }
        if(this.editForm.value.includeProbationDays==true){
          this.editForm.patchValue({
            includeProbationDays:"Yes",
          })
          
          }else{
            this.editForm.patchValue({
              includeProbationDays:"No",
            })
          }
  }
  getEmployeeEOSAccrualTypeDetail(){
    this.isLoading=true;
    this.eosService.getEmployeeEOSAccrual().subscribe(res=>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
        this.EOSAccrualTypeDetails = [...res, temp];
        this.settlementBfCode=this.EOSAccrualTypeDetails.find((item) => item.id == this.relDetails.employeeEOSAccrualType)
        this.isLoading=false
    })
  }
  getEmployeeEOSpaymentTypeDetail(){
    debugger
    this.isLoading=true;
    this.eosService.getEmployeeEOSpaymentType().subscribe(res=>{
      let temp = { id: undefined, name: 'test', isLastRow: true }
      // lastrow
        this.EOSPaymentTypeDetails = [...res, temp];
        this.eosPaymentBfCodeObj=this.EOSPaymentTypeDetails.find((item) => item.id == this.relDetails.employeeEOSpaymentType)
        this.isLoading=false
    })
  }
  onSubmit() {
    this.editForm.value.id=this.relDetails.id
    if(this.editForm.value.retrospectiveAccrual=="Yes"){
      this.editForm.value.retrospectiveAccrual=true
      }
      else{
        this.editForm.value.retrospectiveAccrual=false
      }
      if(this.editForm.value.includeLOPDays=="Yes"){
        this.editForm.value.includeLOPDays=true
        }
        else{
          this.editForm.value.includeLOPDays=false
        }
        if(this.editForm.value.includeProbationDays=="Yes"){
          this.editForm.value.includeProbationDays=true
          }
          else{
            this.editForm.value.includeProbationDays=false
          }
    const eosForm = this.editForm.value;
    if(!this.codeExistCheck){
      this.eosService.update(eosForm).subscribe(result => {
        this.toastr.showSuccessMessage('The Eos updated successfully!');
        this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to add the Eos');
          });
    }
   
    
  }

  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = this.editForm.value.includedBenefits;

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.editForm.get(type).patchValue(result);
      }
    });
  }
  checkCodeEXist(event){
    this.eosService.getCode(event).subscribe((result)=>{
      if(result){
        this.codeExistCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.codeExistCheck=false
      }
    })
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['',[Validators.required, Validators.maxLength(30)] ],
      bfName: ['', [
        Validators.required, Validators.maxLength(50),
      ]],
      retrospectiveAccrual: [false, [
        Validators.required
      ]],
      includeLOPDays: [false, [
        Validators.required
      ]],
      includeProbationDays: [false, [
        Validators.required
      ]],
      employeeEOSAccrualType: ['', [
        Validators.required
      ]],
      employeeEOSpaymentType: ['', [
        Validators.required
      ]],
      // includedBenefits: ['', [
      //   Validators.required
      // ]],
      
    });
  }
  selectSettlementCode(args){
    this.editForm.patchValue({
      employeeEOSAccrualType:args.value.id,
    })
  }
  selectPaymentBfCode(args){
    this.editForm.patchValue({
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
