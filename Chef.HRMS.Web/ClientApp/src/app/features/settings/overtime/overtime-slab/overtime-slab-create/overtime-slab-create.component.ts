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
  @Input() overtimeSlabDetails:any
  normalOverTimeDetails=[]
  holidayOverTimeDetails=[]
  specialOverTimeDetails=[]
  checkLimitValue:boolean=false
  checkNormal:boolean=false
  checkSpecial:boolean=false
  checkHoliday:boolean=false
  checkSlabValue:boolean=false

  constructor( 
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private overTimeSlabService:OverTimeSlabService,
    private eosService:EosService,
  
    ) { }

  ngOnInit(): void {
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
    // this.overtimeSlabDetails.forEach((x)=>{
    //   if(x.overTimeType==1){
    //     this.normalOverTimeDetails = [...this.normalOverTimeDetails, x.upperLimit];
    //   }else if(x.overTimeType==2){
    //     this.holidayOverTimeDetails = [...this.holidayOverTimeDetails, x.upperLimit];
    //   }else if(x.overTimeType==3){
    //     this.specialOverTimeDetails = [...this.specialOverTimeDetails, x.upperLimit];
    //   }
      
    // })

    this.normalOverTimeDetails=this.overtimeSlabDetails.filter(x=>x.overTimeType==1)
    this.holidayOverTimeDetails=this.overtimeSlabDetails.filter(x=>x.overTimeType==2)
    this.specialOverTimeDetails=this.overtimeSlabDetails.filter(x=>x.overTimeType==3)
   console.log(this.normalOverTimeDetails,this.specialOverTimeDetails,this.holidayOverTimeDetails)
      
  }



  onSubmit() {
    debugger
    const eosForm = this.addForm.value;
    if(this.addForm.value.upperLimit > this.addForm.value.lowerLimit && !this.checkSlabValue)
    {  this.overTimeSlabService.add(eosForm).subscribe(result => {
      this.toastr.showSuccessMessage('The OvertimeSlab added successfully!');
      this.activeModal.close('submit');
    },
      error => {
        this.toastr.showErrorMessage('Unable to add the OvertimeSlab');
    });

    }else{
      this.toastr.showWarningMessage("Upper Limit Should be greater than Lower Limit")
    }
  
    
  
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
      overtimetype:['', [
        Validators.required
      ]]
    });
  }
  checkLowerLimit(event){
    debugger
    let changeToNumber=Number(event)
    if(this.checkNormal){
      //  let array=this.normalOverTimeDetails[this.normalOverTimeDetails.length-1]
      //  if(array==undefined){
      //    array=0
      //  }
      //  if(changeToNumber>array){
      //     this.checkSlabValue=true
      //  }else{
      //     this.toastr.showWarningMessage("NormalOverTimeSlab Value Already Exists")
      //     return
      //   }

      for(let i=0;i < this.normalOverTimeDetails.length;i++){
        if(changeToNumber >= this.normalOverTimeDetails[i].lowerLimit && changeToNumber <= this.normalOverTimeDetails[i].upperLimit){
          this.toastr.showWarningMessage("NormalOverTimeSlab Value Already Exists")
          this.checkSlabValue=true
          return
        }else{
          this.checkSlabValue=false
        }
       }
    }else if(this.checkHoliday){
          // let array=this.holidayOverTimeDetails[this.holidayOverTimeDetails.length-1]
          // if(array==undefined){
          //   array=0
          // }
          // if(changeToNumber>array){
          //    this.checkSlabValue=true
          // }else{
          //   this.toastr.showWarningMessage("HolidayOverTimeSlab Value Already Exists")
          //   return
          // }

          
      for(let i=0;i < this.holidayOverTimeDetails.length;i++){
        if(changeToNumber >= this.holidayOverTimeDetails[i].lowerLimit && changeToNumber <= this.holidayOverTimeDetails[i].upperLimit){
         this.toastr.showWarningMessage("HolidayOverTimeSlab Value Already Exists")
        this.checkSlabValue=true
        return
        }else{
          this.checkSlabValue=false
        }
       }
    }else if(this.checkSpecial){
        //   let array=this.specialOverTimeDetails[this.specialOverTimeDetails.length-1]
        //   if(array==undefined){
        //      array=0
        //   }
        //  if(changeToNumber>array){
        //     this.checkSlabValue=true
        //  }else{
        //    this.toastr.showWarningMessage("SpecialOverTimeSlab Value Already Exists")
        //    return
        //   }

        for(let i=0;i < this.specialOverTimeDetails.length;i++){
          if(changeToNumber >= this.specialOverTimeDetails[i].lowerLimit && changeToNumber <= this.specialOverTimeDetails[i].upperLimit){
            this.toastr.showWarningMessage("SpecialOverTimeSlab Value Already Exists")
            this.checkSlabValue=true
            return
          }else{
            this.checkSlabValue=false
          }
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
      this.checkHoliday=false
      this.checkSpecial=false
      this.addForm.patchValue({
        lowerLimit:''
      })
      
    }else if(this.addForm.value.overtimetype==2){
      this.checkHoliday=true
      this.checkNormal=false
      this.checkSpecial=false
      this.addForm.patchValue({
        lowerLimit:''
      })

    }else if(this.addForm.value.overtimetype==3){
      this.checkSpecial=true
      this.checkNormal=false
      this.checkHoliday=false
      this.addForm.patchValue({
        lowerLimit:''
      })
    }
  }
}


