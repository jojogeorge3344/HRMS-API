import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosSlabService } from '../eos-slab.service';
import { EosService } from '@settings/eos/eos.service';

@Component({
  selector: 'hrms-eos-slab-create',
  templateUrl: './eos-slab-create.component.html',
  styleUrls: ['./eos-slab-create.component.scss']
})
export class EosSlabCreateComponent implements OnInit {

  addForm: FormGroup;
  BfDetails: any
  


  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private eosSlabService:EosSlabService,
    private eosService:EosService,
  
    ) { }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.getBfDetails()
  }



  onSubmit() {
    const eosForm = this.addForm.value;
    this.eosSlabService.add(eosForm).subscribe(result => {
          this.toastr.showSuccessMessage('The EosSlab added successfully!');
          this.activeModal.close('submit');
        },
          error => {
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
  getBfName(event){
    if(event){
     let a=this.BfDetails.filter((value)=>value.bfCode==event)
     this.addForm.patchValue({
      bfName:a[0].bfName,
      eosId:a[0].id
     })
    }

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
      eosId: ['', ],
    });
  }


}

















