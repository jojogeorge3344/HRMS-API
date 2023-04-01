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

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private eosService:EosService,
    public activeModal: NgbActiveModal,
  
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
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
      benefitName: ['', [
        Validators.required
      ]],
      retrospectiveAccrual: ['', [
        Validators.required
      ]],
      includeLopDays: ['', [
        Validators.required
      ]],
      includeProbationDays: ['', [
        Validators.required
      ]],
      eosSettlement: ['', [
        Validators.required
      ]],
      includedBenefits: ['', [
        Validators.required
      ]],
      
    });
  }

}














