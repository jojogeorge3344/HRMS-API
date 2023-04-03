import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosSlabService } from '../eos-slab.service';
import { EosSlabGroup } from '../eos-slab.model';
import { EosService } from '@settings/eos/eos.service';

@Component({
  selector: 'hrms-eos-slab-edit',
  templateUrl: './eos-slab-edit.component.html',
  styleUrls: ['./eos-slab-edit.component.scss']
})
export class EosSlabEditComponent implements OnInit {

  addForm: FormGroup;
  BfDetails: any
  @Input() relDetails: EosSlabGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private eosSlabService:EosSlabService,
    private eosService:EosService,) {
  }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.addForm.patchValue(this.relDetails);
    this.getBfDetails()
  }

  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    const eosForm = this.addForm.value;
    this.eosSlabService.update(eosForm).subscribe(result => {
    this.toastr.showSuccessMessage('The EosSlab updated successfully!');
    this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the EosSlab');
      });
    
  }
  getBfDetails() {
    this.eosService.getAll().subscribe((result) => {
      for(let i=0;i<result.length;i++){
        this.BfDetails = result
      }
    })
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['', [
        Validators.required
      ]],
      bfName: ['', [
        Validators.required
      ]],
      lowerLimit: ['', [
        Validators.required
      ]],
      upperLimit: ['', [
        Validators.required
      ]],
      valueVariable: ['', [
        Validators.required
      ]],
      valuetype: ['', [
        Validators.required
      ]],
      
    });
  }

}





