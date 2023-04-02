import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '../eos.service';
import { EosGroup } from '../eos.model';

@Component({
  selector: 'hrms-eos-edit',
  templateUrl: './eos-edit.component.html',
  styleUrls: ['./eos-edit.component.scss']
})
export class EosEditComponent implements OnInit {

  addForm: FormGroup;
  @Input() relDetails: EosGroup;
  @Input() Code: string[];
  @Input() Name: string[];
  codeExistCheck:boolean=false

  constructor(
    private eosService:EosService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);

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
