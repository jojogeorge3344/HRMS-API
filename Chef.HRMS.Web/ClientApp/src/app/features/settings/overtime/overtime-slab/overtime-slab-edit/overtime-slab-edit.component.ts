import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '@settings/eos/eos.service';
import { OverTimeSlabGroup } from '../overtime-slab-model';
import { OverTimeSlabService } from '../overtime-slab-service';


@Component({
  selector: 'hrms-overtime-slab-edit',
  templateUrl: './overtime-slab-edit.component.html',
  styleUrls: ['./overtime-slab-edit.component.scss']
})
export class OvertimeSlabEditComponent implements OnInit {
  addForm: FormGroup;
  BfDetails: any
  @Input() relDetails: OverTimeSlabGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private overTimeSlabService:OverTimeSlabService,
    private eosService:EosService,) {
  }

  ngOnInit(): void {
    this.addForm = this.createFormGroup();
    this.addForm.patchValue({
      // bfCode:this.relDetails.bfCode,
      overTimePolicyCode:this.relDetails.overTimePolicyCode,
      lowerLimit:this.relDetails.lowerLimit,
      upperLimit:this.relDetails.upperLimit,
      valueVariable:this.relDetails.valueVariable,
      valueType:this.relDetails.valueType

    });
  
    //this.getBfDetails()
  }

  // getBfDetails() {
  //   this.eosService.getAll().subscribe((result) => {
  //       this.BfDetails = result
      
  //   })
  // }
  // getOverTimePolicyName(event){
  //   if(event){
  //    let a=this.BfDetails.filter((value)=>value.bfCode==event)
  //    this.addForm.patchValue({
  //     overTimePolicyName:a[0].overTimePolicyName,
  //     eosId:a[0].id
  //    })
  //   }

  // }
  
  onSubmit() {
    this.addForm.value.id=this.relDetails.id
    const eosForm = this.addForm.value;
    this.overTimeSlabService.update(eosForm).subscribe(result => {
    this.toastr.showSuccessMessage('The OvertimeSlab updated successfully!');
    this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the OvertimeSlab');
      });
    
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      // bfCode: ['', [
      //   Validators.required
      // ]],
      overTimePolicyCode: ['', [
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
      valueType: ['', [
        Validators.required
      ]],
      overTimePolicyId: [0, ],
    });
  }


}




