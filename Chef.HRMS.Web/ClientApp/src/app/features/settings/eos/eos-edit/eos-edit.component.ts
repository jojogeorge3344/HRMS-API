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

  addForm: FormGroup;
  @Input() relDetails: EosGroup;
  codeExistCheck:boolean=false
  EOSAccrualTypeDetails: any;
  EOSPaymentTypeDetails: any
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
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);
    this.getEmployeeEOSAccrualTypeDetail()
    this.getEmployeeEOSpaymentTypeDetail()
    // this.employeeEOSAccrualTypeKeys = Object.keys(this.employeeEOSAccrual).filter(Number).map(Number);
    // this.employeeEOSpaymentTypeKeys = Object.keys(this.employeeEOSpayment).filter(Number).map(Number);
    if(this.addForm.value.retrospectiveAccrual==true){
      this.addForm.patchValue({
        retrospectiveAccrual:"Yes",
      })
      
      }else{
        this.addForm.patchValue({
          retrospectiveAccrual:"No",
        })
      }
      if(this.addForm.value.includeLOPDays==true){
        this.addForm.patchValue({
          includeLOPDays:"Yes",
        })
        
        }else{
          this.addForm.patchValue({
            includeLOPDays:"No",
          })
        }
        if(this.addForm.value.includeProbationDays==true){
          this.addForm.patchValue({
            includeProbationDays:"Yes",
          })
          
          }else{
            this.addForm.patchValue({
              includeProbationDays:"No",
            })
          }
  }
  getEmployeeEOSAccrualTypeDetail(){
    this.eosService.getEmployeeEOSAccrual().subscribe(res=>{
      this.EOSAccrualTypeDetails=res
    })
  }
  getEmployeeEOSpaymentTypeDetail(){
    this.eosService.getEmployeeEOSpaymentType().subscribe(res=>{
      this.EOSPaymentTypeDetails=res
    })
  }
  onSubmit() {
    this.addForm.value.id=this.relDetails.id
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
    modalRef.componentInstance.formula = this.addForm.value.includedBenefits;

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.addForm.get(type).patchValue(result);
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

      bfCode: ['',[Validators.required, Validators.maxLength(14)] ],
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
      includedBenefits: ['', [
        Validators.required
      ]],
      
    });
  }

}
