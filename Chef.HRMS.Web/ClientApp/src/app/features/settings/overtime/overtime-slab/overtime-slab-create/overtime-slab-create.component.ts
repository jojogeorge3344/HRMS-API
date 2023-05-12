import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '@settings/eos/eos.service';
import { OverTimeSlabService } from '../overtime-slab-service';
import { OvertimeType } from 'src/app/models/common/types/overtimeType';

@Component({
  selector: 'hrms-overtime-slab-create',
  templateUrl: './overtime-slab-create.component.html',
  styleUrls: ['./overtime-slab-create.component.scss']
})
export class OvertimeSlabCreateComponent implements OnInit {

  addForm: FormGroup;
  BfDetails: any;
  overtimetype=OvertimeType;
  overtimetypekeys: number[];
  @Input() code
  @Input() id


  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private overTimeSlabService:OverTimeSlabService,
    private eosService:EosService,
  
    ) { }

  ngOnInit(): void {
    debugger
    console.log("overtimetypes",this.overtimetype)

    this.addForm = this.createFormGroup();
    this.overtimetypekeys = Object.keys(this.overtimetype)
    .filter(Number)
    .map(Number);
    //this.getBfDetails()
    if(this.code){
      this.addForm.patchValue({
        overTimePolicyCode:this.code,
        overTimePolicyId:this.id
      })
    }
  }



  onSubmit() {
    debugger
    const eosForm = this.addForm.value;
    this.overTimeSlabService.add(eosForm).subscribe(result => {
          this.toastr.showSuccessMessage('The OvertimeSlab added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the OvertimeSlab');
    });
    
  
  }


  // getBfDetails() {
  //   this.eosService.getAll().subscribe((result) => {
  //     for(let i=0;i<result.length;i++){
  //       this.BfDetails = result
  //     }
  //   })
  // }
  // getOverTimePolicyName(event){
  //   if(event){
  //    let a=this.BfDetails.filter((value)=>value.bfCode==event)
  //    this.addForm.patchValue({
  //     overTimePolicyName:a[0].overTimePolicyName,
  //     //eosId:a[0].id
  //    })
  //   }

  // }
  
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
      valuetype: ['', [
        Validators.required
      ]],
      overTimePolicyId: [0, ],
      overtimetype:['']
    });
  }

}


