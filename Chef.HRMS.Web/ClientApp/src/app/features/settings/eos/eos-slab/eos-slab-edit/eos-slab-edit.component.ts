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
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      bfCode:this.relDetails.bfCode,
      bfName:this.relDetails.bfName,
      lowerLimit:this.relDetails.lowerLimit,
      upperLimit:this.relDetails.upperLimit,
      valueVariable:this.relDetails.valueVariable,
      valueType:this.relDetails.valueType

    });
  
    this.getBfDetails()
  }

  getBfDetails() {
    this.eosService.getAll().subscribe((result) => {
        this.BfDetails = result
      
    })
  }
  getBfName(event){
    if(event){
     let a=this.BfDetails.filter((value)=>value.bfCode==event)
     this.addForm.patchValue({
      bfName:a[0].bfName,
      eosId:a[0].id
     })
    }

  }
  
  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    this.addForm.value.valueType = parseInt(this.addForm.value.valueType)
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
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      bfCode: ['', [
        Validators.required,Validators.maxLength(30)
      ]],
      bfName: ['', [
        Validators.required,Validators.maxLength(60)
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
      valueType: ['', [
        Validators.required
      ]],
      eosId: [0, ],
    });
  }

}





