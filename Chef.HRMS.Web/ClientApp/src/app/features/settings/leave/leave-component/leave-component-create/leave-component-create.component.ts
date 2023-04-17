import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { LeaveComponentService } from '../leave-component.service';
import { GenderType } from '../../../../../models/common/types/gendertype';
import { MaritalStatusType } from '../../../../../models/common/types/maritalstatustype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { BaseType } from '@settings/leave/basetype.enum';
import { EligiblityBase } from '@settings/leave/Eligibilitybase.enum';
import { LeaveCutoffType } from '@settings/leave/leavecuttoff.enum';
import { LeaveType } from '@settings/leave/leavetype.enum';
import { Loptype } from '@settings/leave/lopdays.enum';
import { LeaveEligiblityService } from '../leave-eligiblity.service';
import { debounce } from 'lodash';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OvertimePolicyCalculationComponent } from '@settings/overtime/overtime-policy-configuration/overtime-policy-calculation/overtime-policy-calculation.component';
import { LeaveSlabService } from '../leave-slab-service';
import { valueTypeOff } from 'src/app/models/common/types/leaveSlabOff';



@Component({
  selector: 'hrms-leave-component-create',
  templateUrl: './leave-component-create.component.html'
})
export class LeaveComponentCreateComponent implements OnInit {


  addForm: FormGroup;
  addForm2:FormGroup;
  addForm3:FormGroup;
  currentUserId: number;
  genderTypes = GenderType;
  maritalStatusTypes = MaritalStatusType;
  basetype =BaseType;
  eligiblitybase=EligiblityBase;
  leavecutofftype =LeaveCutoffType;
  leavetypes=LeaveType;
  lopdays =Loptype;
  leavetypearray:number[];
  lopday:number[];
  leavecutoff:number[];
  basetypes:number[];
  eligiblitybases:number[];
  dedecutionarray:[];
  leavetype:[];
  genderTypeKeys: number[];
  maritalStatusTypeKeys: number[];
  leavecomponentid:number;
  isdisabled:boolean = true;
  isSlabdisabled:boolean = true;
  isCfLimit: boolean=true
  @Input() leaveComponentNames: string[];
  @Input() leaveComponentCodes: string[];
  @ViewChild('myTabSet') tabSet: NgbTabset;
  isEncash: boolean=true;
  isAnnual: boolean=true;
  isEncashBf: boolean=true;
  isEncashLimit: boolean=true;
  detectionTypeList: any;
  accuralList: any;
  accuralBenefitList: any;
  encashBfList: any;
  isSaveDisable:boolean=false;
  //leaveDetails: any;
  valuetype: object;
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;
  leaveComponentsList: any;

  constructor(
    private leaveComponentService: LeaveComponentService,
    private leaveeligiblityservice:LeaveEligiblityService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    public leaveSlabService: LeaveSlabService,) {
  }

  ngOnInit(): void {
    
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.basetypes = Object.keys(this.basetype).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes).filter(Number).map(Number);
    this.eligiblitybases = Object.keys(this.eligiblitybase).filter(Number).map(Number);
    this.leavecutoff = Object.keys(this.leavecutofftype).filter(Number).map(Number);
    this.leavetypearray = Object.keys(this.leavetypes).filter(Number).map(Number);
    this.lopday = Object.keys(this.lopdays).filter(Number).map(Number);
    this.valueSlabOffTypeKeys = Object.keys(this.valueSlabOffType).filter(Number).map(Number);
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addForm2 = this.createFormGroup2();
    this.addForm3 = this.createFormGroup3();
    this.getdeductiontype();
    this.getAccrualBenefitType();
    this.getAccrualType();
    this.getDetectionListType()
    this.getEncashBF()
    //this.getLeaveDetails()
  }
getdeductiontype(){
  this.leaveComponentService.getbenefitcategory().subscribe((result: any) => {
    this.dedecutionarray =result;


})

}
getLeavetype(){
  let categoryid=this.addForm.value.benefitCategoryId
  this.leaveComponentService.getbenefittype(categoryid).subscribe((result: any) => {
    this.leavetype =result;


})
}
  toggleGender(checked) {
    if (checked) {
      this.addForm.addControl('restrictedToGender', new FormControl(null, Validators.required));
    } else {
      this.addForm.removeControl('restrictedToGender');
    }
  }

  toggleMaritalStatus(checked) {
    if (checked) {
      this.addForm.addControl('restrictedToMaritalStatus', new FormControl(null, Validators.required));
    } else {
      this.addForm.removeControl('restrictedToMaritalStatus');
    }
  }

  get name() { return this.addForm.get('name'); }

  get code() { return this.addForm.get('code'); }

  onSubmit() {
    
    this.leaveComponentService.add(this.addForm.value).subscribe((result: any) => {
      
      if (result.id === -1) {
        this.toastr.showErrorMessage('Leave component already exists!');
      } else {
       this.leavecomponentid =result
        // this.activeModal.close(result);
        this.isdisabled = false;
        
        this.toastr.showSuccessMessage('Basic Leave Component is created successfully!');
        this.isSaveDisable=true
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Basic Leave Component');
      });
  }
getDetectionListType(){
  this.leaveComponentService.getDetectiontype().subscribe((res)=>{
    this.detectionTypeList=res
  })
}
getAccrualType(){
  this.leaveComponentService.getAccrualtype().subscribe((res)=>{
    this.accuralList=res
  })
}
getAccrualBenefitType(){
  this.leaveComponentService.getAccrualBenefittype().subscribe((res)=>{
    this.accuralBenefitList=res
  })
}
  getCarry(event){
    debugger
    if(event == "true"){
      this.addForm2.get('cfLimitDays').enable();
      this.isCfLimit=false
    }else{
      this.addForm2.get('cfLimitDays').disable();
      this.isCfLimit=true
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }
  getLeave(event){
    debugger
    if(this.addForm2.value.leaveType==1){
      this.addForm2.get('leaveEncashment').enable();
      this.addForm2.get('annualLeave').enable();
      this.isEncash=false
      this.isAnnual=false
      
    }else{
      this.addForm2.get('leaveEncashment').disable();
      this.addForm2.get('annualLeave').disable();
      this.isEncash=true
      this.isAnnual=true
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }
  getcash(event){
    debugger
    if(event == "true"){
      this.addForm2.get('encashBFCode').enable();
      this.addForm2.get('encashLimitDays').enable();
      this.isEncashBf=false
      this.isEncashLimit=false
      
    }else{
      this.addForm2.get('encashBFCode').disable();
      this.addForm2.get('encashLimitDays').disable();
      this.isEncashBf=true
      this.isEncashLimit=true
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }
  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = '';

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.addForm2.get(type).patchValue(result);
      }
    });
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [null, [
        Validators.required,
        Validators.maxLength(100),
        //Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.leaveComponentNames)
      ]],
      code: [null, [
        Validators.required,
        Validators.maxLength(30),
        //Validators.pattern('^([a-zA-Z0-9])+$'),
        duplicateNameValidator(this.leaveComponentCodes)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(256)
      ]],
      showLeaveDescription: [false],
      isPaidLeave: [false],
      isSickLeave: [false],
      isStatutoryLeave: [false],
      isRestrictedToGender: [false],
      isRestrictedToMaritalStatus: [false],
      benefitCategoryId:[0, [
        Validators.required,]],
      benefitTypeId:[0,[
        Validators.required,]],
     
    });
  }
  createFormGroup2(): FormGroup {
    return this.formBuilder.group({
      eligibleDays:[null],
      eligibilityBase:[0,[Validators.required]],
      maxLeaveAtATime:[null],
      vacationSalaryFormula:[null],
      encashBFCode:[{ value: 0, disabled: this.isEncashBf }],
      encashLimitDays:[{ value: 0, disabled: this.isEncashLimit }],
      cfLimitDays:[{ value: 0, disabled: this.isCfLimit }],
      baseType:[null,[Validators.required]],
      isIncludeLOPDays:[null,[Validators.required] ],
      leaveType:[null,[Validators.required]],
      leaveCutOffType:[null,[Validators.required]],
      isAccruedLeaveAmount:[false,[Validators.required]],
      isEncash:[false,[Validators.required]],
      isCarryForward:[false,[Validators.required]],
      leaveComponentId:[null],
      leaveDeduction:[0],
      leaveEncashment:[{ value: 0, disabled: this.isEncash }],
      annualLeave:[{ value: 0, disabled: this.isAnnual }],
    })
  }
  createFormGroup3(): FormGroup {
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
    })
  }
  onSubmit2() {

    this.addForm2.patchValue({
      leaveComponentId:this.leavecomponentid
    })
    this.leaveeligiblityservice.add(this.addForm2.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Configure Leave component already exists!');
      } else {
        //this.activeModal.close(result);
        this.isSlabdisabled=false
        this.toastr.showSuccessMessage('Configure Leave Component is created successfully!');
        this.getWholeDetails()
        
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Leave Component');
      });
  }

  onSubmit3() {

    this.addForm3.patchValue({
      leaveComponentId:this.leavecomponentid
    })
    this.leaveSlabService.add(this.addForm3.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Configure Slab component already exists!');
      } else {
        this.activeModal.close(result);
        
        this.toastr.showSuccessMessage('Configure Slab Component is created successfully!');
        
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Slab Component');
      });
  }
  getEncashBF(){
    this.leaveeligiblityservice.getBenefitType().subscribe((res)=>{
      this.encashBfList=res
    })
   
  }
  getWholeDetails(){
    debugger
  this.leaveComponentService.getAll().subscribe(res => {
    this.leaveComponentsList = res
    let a=this.leaveComponentsList.filter((value)=>value.code==this.addForm.value.code)
    this.addForm3.patchValue({
      leaveComponentCode:a[0].code,
      leaveComponentName:a[0].name,
    })
  })
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
  //    this.addForm3.patchValue({
  //     leaveComponentName:a[0].name,
  //     // leaveComponentId:a[0].id
  //    })
  //   }

  // }
}
