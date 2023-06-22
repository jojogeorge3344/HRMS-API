import { Component, OnInit,Input} from '@angular/core';
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
  @Input() eosSlabDetails
  checkLimitValue:boolean=false
  upperLimitDetails=[]
  bcode: any;
  arrayValue: any;
  checkSave: boolean=false;


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
    this.addForm.value.valuetype = parseInt(this.addForm.value.valuetype)
    const eosForm = this.addForm.value;
    if(this.checkSave && !this.checkLimitValue && (this.addForm.value.upperLimit>this.addForm.value.lowerLimit))
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
      valuetype: ['', [
        Validators.required
      ]],
      eosId: ['', ],
    });
  }
  checkLowerLimit(event){
    this.eosSlabDetails.forEach((x)=>{
      if(x.bfCode==this.bcode){
        this.upperLimitDetails = [...this.upperLimitDetails, x.upperLimit];
        this.arrayValue= this.upperLimitDetails[ this.upperLimitDetails.length-1]
       
      }
    })
    if(this.arrayValue==undefined){
      this.arrayValue=0
    }
    if( event > this.arrayValue){
    this.checkSave=true
    }else{
      this.toastr.showWarningMessage("Slab Value is Already Exist")
      this.checkSave=false
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
  getBenefitCode(event){
    this.bcode=event
  
  }
}

















