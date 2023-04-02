import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';

@Component({
  selector: 'hrms-eos-create',
  templateUrl: './eos-create.component.html',
  styleUrls: ['./eos-create.component.scss']
})
export class EosCreateComponent implements OnInit {

  addForm: FormGroup;
  componentType: any;

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private eosService:EosService,
    public activeModal: NgbActiveModal,
  
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getComponent()
  }

  getComponent(){
    this.eosService.get().subscribe((result)=>{
    this.componentType=result
  })
  }
  onSubmit() {
    if(this.addForm.value.retrospectiveAccrual=="yes"|| this.addForm.value.includeLOPDays=="yes" || this.addForm.value.includeProbationDays=="yes"){
      this.addForm.value.retrospectiveAccrual=true,
      this.addForm.value.includeLOPDays=true
      this.addForm.value.includeProbationDays=true
      }else{
        this.addForm.value.retrospectiveAccrual=false,
        this.addForm.value.includeLOPDays=false
        this.addForm.value.includeProbationDays=false
      }
    const eosForm = this.addForm.value;
    this.eosService.add(eosForm).subscribe(result => {
          this.toastr.showSuccessMessage('The Eos added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the Eos');
    });
    
  
  }

  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['', [
      ]],
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
      eosSettlementBFCode: ['', [
        Validators.required
      ]],
      includedBenefits: ['', [
        Validators.required
      ]],
      
    });
  }

}














