import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EosService } from '@settings/eos/eos.service';
import { OverTimeSlabGroup } from '../overtime-slab-model';
import { OverTimeSlabService } from '../overtime-slab-service';
import { OvertimeType } from 'src/app/models/common/types/overtimeType';


@Component({
  selector: 'hrms-overtime-slab-edit',
  templateUrl: './overtime-slab-edit.component.html',
  styleUrls: ['./overtime-slab-edit.component.scss']
})
export class OvertimeSlabEditComponent implements OnInit {
  addForm: FormGroup;
  BfDetails: any
  overtimetype=OvertimeType;
  overtimetypekeys: number[];
  @Input() code
  @Input() relDetails: OverTimeSlabGroup;
  @Input() id
  @Input() overtimeSlabDetails:any
  normalOverTimeDetails=[]
  holidayOverTimeDetails=[]
  specialOverTimeDetails=[]
  checkLimitValue:boolean=false
  checkNormal:boolean=false
  checkSpecial:boolean=false
  checkHoliday:boolean=false

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private overTimeSlabService:OverTimeSlabService,
    private eosService:EosService,) {
  }

  ngOnInit(): void {
    debugger
    this.addForm = this.createFormGroup();
    this.overtimetypekeys = Object.keys(this.overtimetype)
    .filter(Number)
    .map(Number);
    this.addForm.patchValue({
      // bfCode:this.relDetails.bfCode,
      overTimePolicyCode:this.code,
      overTimePolicyId:this.id,
      lowerLimit:this.relDetails.lowerLimit,
      upperLimit:this.relDetails.upperLimit,
      valueVariable:this.relDetails.valueVariable,
      valueType:this.relDetails.valueType,
      overtimetype:this.relDetails.overTimeType

    });
  
    //this.getBfDetails()
    if(this.relDetails.overTimeType==1){
      this.checkNormal=true
      this.checkHoliday=false
      this.checkSpecial=false
    }else if(this.relDetails.overTimeType==2){
      this.checkHoliday=true
      this.checkSpecial=false
      this.checkNormal=false
    }else if(this.relDetails.overTimeType==3){
      this.checkSpecial=true
      this.checkNormal=false
      this.checkHoliday=false
    }
    this.overtimeSlabDetails.forEach((x)=>{
      if(x.overTimeType==1){
        this.normalOverTimeDetails = [...this.normalOverTimeDetails, x.upperLimit];
      }else if(x.overTimeType==2){
        this.holidayOverTimeDetails = [...this.holidayOverTimeDetails, x.upperLimit];
      }else if(x.overTimeType==3)
      this.specialOverTimeDetails = [...this.specialOverTimeDetails, x.upperLimit];
    })
   console.log(this.normalOverTimeDetails,this.specialOverTimeDetails,this.holidayOverTimeDetails)
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
      overtimetype:['', [
        Validators.required
      ]]
    });
  }
  checkLowerLimit(event){
    let changeToNumber=Number(event)
    if(this.checkNormal){
       let array=this.normalOverTimeDetails[this.normalOverTimeDetails.length-1]
       if(array==undefined){
          array=0
       }
       if(changeToNumber>array){
       }else{
          this.toastr.showWarningMessage("NormalOverTimeSlab Value Already Exists")
          return
        }
    }else if(this.checkHoliday){
      let array=this.holidayOverTimeDetails[this.holidayOverTimeDetails.length-1]
      if(changeToNumber>array){
      }else{
        this.toastr.showWarningMessage("HolidayOverTimeSlab Value Already Exists")
        return
       }
    }else if(this.checkSpecial){
       let array=this.specialOverTimeDetails[this.specialOverTimeDetails.length-1]
       if(array==undefined){
        array=0
       }
       if(changeToNumber>array){
       }else{
        this.toastr.showWarningMessage("SpecialOverTimeSlab Value Already Exists")
        return
       }
    }

 
  }

  checkBothLimit(event){
   let changeToNumber=Number(event)
   if(changeToNumber<=this.addForm.value.lowerLimit){
      this.checkLimitValue=true
   }else{
    this.checkLimitValue=false
   }
   if(this.checkLimitValue){
    this.toastr.showWarningMessage("Upper Limit Should be greater than Lower Limit")
   }
  }
  overTimeType(event){
    debugger
    if(this.addForm.value.overtimetype==1 ){
      this.checkNormal=true
      
    }else if(this.addForm.value.overtimetype==2){
      this.checkHoliday=true

    }else if(this.addForm.value.overtimetype==3){
      this.checkSpecial=true
    }
  }

}




