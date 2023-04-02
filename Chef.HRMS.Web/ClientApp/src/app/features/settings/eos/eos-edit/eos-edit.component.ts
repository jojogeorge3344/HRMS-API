import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';
import { EosGroup } from '../eos.model';
import { EmployeeEOSAccrualType } from 'src/app/models/common/employeeEOSAccrualType';
import { EmployeeEOSpaymentType } from 'src/app/models/common/types/employeeEOSpaymentType';

@Component({
  selector: 'hrms-eos-edit',
  templateUrl: './eos-edit.component.html',
  styleUrls: ['./eos-edit.component.scss']
})
export class EosEditComponent implements OnInit {

  addForm: FormGroup;
  @Input() relDetails: EosGroup;
  codeExistCheck:boolean=false
  employeeEOSAccrualType: object;
  employeeEOSAccrualTypeKeys: number[];
  employeeEOSAccrual = EmployeeEOSAccrualType;
  employeeEOSpaymentType: object;
  employeeEOSpaymentTypeKeys: number[];
  employeeEOSpayment = EmployeeEOSpaymentType;
  constructor(
    private eosService:EosService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);
    this.employeeEOSAccrualTypeKeys = Object.keys(this.employeeEOSAccrual).filter(Number).map(Number);
    this.employeeEOSpaymentTypeKeys = Object.keys(this.employeeEOSpayment).filter(Number).map(Number);
    if(this.addForm.value.retrospectiveAccrual==true|| this.addForm.value.includeLOPDays==true|| this.addForm.value.includeProbationDays==true){
      this.addForm.patchValue({
        retrospectiveAccrual:"Yes",
        includeLOPDays:"Yes",
        includeProbationDays:"Yes"
      })
      
      }else{
        this.addForm.patchValue({
          retrospectiveAccrual:"No",
          includeLOPDays:"No",
          includeProbationDays:"No"
        })
      }
  }

  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    const eosForm = this.addForm.value;
    this.eosService.update(eosForm).subscribe(result => {
    this.toastr.showSuccessMessage('The Eos updated successfully!');
    this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Eos');
      });
    
  }


  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['', ],
      bfName: ['', [
        Validators.required
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
