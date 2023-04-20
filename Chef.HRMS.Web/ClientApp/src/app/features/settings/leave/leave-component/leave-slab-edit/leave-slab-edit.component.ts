import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '@settings/eos/eos.service';
import { LeaveSlabService } from '../leave-slab-service';
import { LeaveComponentService } from '../leave-component.service';
import { valueTypeOff } from 'src/app/models/common/types/leaveSlabOff';
import { LeaveSlabGroup } from '../leave-slab.model';

@Component({
  selector: 'hrms-leave-slab-edit',
  templateUrl: './leave-slab-edit.component.html',
  styleUrls: ['./leave-slab-edit.component.scss']
})
export class LeaveSlabEditComponent implements OnInit {

 
  editForm: FormGroup;
  @Input() relDetails: LeaveSlabGroup;
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;
  @Input() code;
  @Input() name;
  @Input() id;
  // BfDetails: any
  // leaveComponentsList:any
  // leaveDetails:any


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private leaveSlabService:LeaveSlabService,
    private eosService:EosService,
    private leaveComponentService: LeaveComponentService,) {
  }

  ngOnInit(): void {
    debugger
    this.editForm = this.createFormGroup();
    this.editForm.patchValue({
      leaveComponentCode:this.relDetails.leaveComponentCode,
      leaveComponentName:this.relDetails.leaveComponentName,
      lowerLimit:this.relDetails.lowerLimit,
      upperLimit:this.relDetails.upperLimit,
      valueVariable:this.relDetails.valueVariable,
      valueType:this.relDetails.valueType,
      leaveComponentId:this.id

    });
    this.valueSlabOffTypeKeys = Object.keys(this.valueSlabOffType).filter(Number).map(Number);
    // this.getBfDetails()
    // this.getWholeDetails()
    // this.getLeaveDetails()
  }
  
  onSubmit() {
    debugger
    this.editForm.value.id=this.relDetails.id
    const leaveForm = this.editForm.value;
    this.leaveSlabService.update(leaveForm).subscribe(result => {
    this.toastr.showSuccessMessage('The LeaveSlab updated successfully!');
    this.activeModal.close('submit');
    },
      error => {
        console.error(error);
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

   // getBfDetails() {
  //   this.eosService.getAll().subscribe((result) => {
  //       this.BfDetails = result
      
  //   })
  // }
  // getBfName(event){
  //   if(event){
  //    let a=this.BfDetails.filter((value)=>value.leaveComponentCode==event)
  //    this.editForm.patchValue({
  //     leaveComponentName:a[0].leaveComponentName,
  //     //eosId:a[0].id
  //    })
  //   }

  // }
  
// onSubmit(){
//   this.editForm.patchValue({
//     leaveComponentId:this.leaveComponent.id,
//     //id:this.configId
//   })
//   this.leaveSlabService.update(this.editForm.getRawValue()).subscribe((result: any) => {
    
//       this.activeModal.close('submit');
//       this.toastr.showSuccessMessage('Leave component is updated successfully!');
      
//   },
//     error => {
//       console.error(error);
//       this.toastr.showErrorMessage('Unable to update the leave component');
//     });
// }

// getWholeDetails(){
//   debugger
// this.leaveComponentService.getAll().subscribe(res => {
//   this.leaveComponentsList = res
//   let a=this.leaveComponentsList.filter((value)=>value.code==this.editForm.value.code)
//   this.editForm.patchValue({
//     leaveComponentCode:a[0].code,
//     leaveComponentName:a[0].name,
//   })
// })
// }
// getLeaveDetails() {
//   debugger
//   this.leaveSlabService.getAll().subscribe((result) => {
//     this.leaveDetails = result
//     let a=this.leaveDetails.filter((value)=>value.leaveComponentId==this.id)
      
//       this.editForm.patchValue({
//         // leaveComponentId: a[0].leaveComponentId,
//         // leaveComponentName: a[0].leaveComponentName,
//         // leaveComponentCode:a[0].leaveComponentCode,
//         lowerLimit:a[0].lowerLimit,
//         upperLimit:a[0].upperLimit,
//         valueVariable:a[0].valueVariable,
//         valueType:a[0].valueType,
//         id:a[0].id
//       })
    
//       console.log(this.editForm)
//   })
// }
// getLeaveName(event){
//   debugger
//   if(event){
//    let a=this.leaveComponentsList.filter((value)=>value.code==event)
//    this.editForm.patchValue({
//     leaveComponentName:a[0].name,
//     leaveComponentId:this.id,
    
    
//    })
//   }

// }
}





