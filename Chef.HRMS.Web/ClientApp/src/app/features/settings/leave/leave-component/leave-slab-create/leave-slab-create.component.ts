import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LeaveSlabService } from '../leave-slab-service';
import { LeaveComponentService } from '../leave-component.service';
import { valueTypeOff } from 'src/app/models/common/types/leaveSlabOff';

@Component({
  selector: 'hrms-leave-slab-create',
  templateUrl: './leave-slab-create.component.html',
  styleUrls: ['./leave-slab-create.component.scss']
})
export class LeaveSlabCreateComponent implements OnInit {

  addForm: FormGroup;
  BfDetails: any
  leaveComponentsList:any
  leaveDetails:any
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;
  @Input() code;
  @Input() name;
  @Input() id;


  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public leaveSlabService: LeaveSlabService,
    private leaveComponentService: LeaveComponentService,
  
    ) { }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    //this.getBfDetails()
    this.getWholeDetails()
    this.valueSlabOffTypeKeys = Object.keys(this.valueSlabOffType).filter(Number).map(Number);
    if(this.code && this.name){
       this.addForm.patchValue({
       leaveComponentCode:this.code,
       leaveComponentName:this.name,
       leaveComponentId:this.id
    })
    }
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

  getWholeDetails(){
    debugger
  this.leaveComponentService.getAll().subscribe(res => {
    this.leaveComponentsList = res
    let a=this.leaveComponentsList.filter((value)=>value.code==this.addForm.value.code)
    this.addForm.patchValue({
      leaveComponentCode:a[0].code,
      leaveComponentName:a[0].name,
    })
  })
  }

  onSubmit() {
    const leaveForm = this.addForm.value;
    this.leaveSlabService.add(leaveForm).subscribe(result => {
          this.toastr.showSuccessMessage('The LeaveSlab added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            this.toastr.showErrorMessage('Unable to add the LeaveSlab');
    });
    
  
  }
  
  createFormGroup(): FormGroup {
    return this.formBuilder.group({

      leaveComponentCode: ['', [
              Validators.required
            ]],
            leaveComponentName: ['', [
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
            leaveComponentId: ['', ],
    });
  }

  // getLeaveDetails() {
  //   debugger
  //   this.leaveSlabService.getAll().subscribe((result) => {
  //     for(let i=0;i<result.length;i++){
  //       this.leaveDetails = result
  //     }
  //   })
  // }
  // getLeaveName(event){
  //   debugger
  //   if(event){
  //    let a=this.leaveComponentsList.filter((value)=>value.code==event)
  //    this.addForm.patchValue({
  //     leaveComponentName:a[0].name,
  //     // leaveComponentId:a[0].id
  //    })
  //   }

  // }

    // getBfDetails() {
  //   this.eosService.getAll().subscribe((result) => {
  //     for(let i=0;i<result.length;i++){
  //       this.BfDetails = result
  //     }
  //   })
  // }
}






















