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



@Component({
  selector: 'hrms-leave-component-create',
  templateUrl: './leave-component-create.component.html'
})
export class LeaveComponentCreateComponent implements OnInit {


  addForm: FormGroup;
  addForm2:FormGroup;
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

  constructor(
    private leaveComponentService: LeaveComponentService,
    private leaveeligiblityservice:LeaveEligiblityService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,) {
  }

  ngOnInit(): void {
    
    this.genderTypeKeys = Object.keys(this.genderTypes).filter(Number).map(Number);
    this.basetypes = Object.keys(this.basetype).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes).filter(Number).map(Number);
    this.eligiblitybases = Object.keys(this.eligiblitybase).filter(Number).map(Number);
    this.leavecutoff = Object.keys(this.leavecutofftype).filter(Number).map(Number);
    this.leavetypearray = Object.keys(this.leavetypes).filter(Number).map(Number);
    this.lopday = Object.keys(this.lopdays).filter(Number).map(Number);
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addForm2 = this.createFormGroup2();
    this.getdeductiontype();
    this.getAccrualBenefitType();
    this.getAccrualType();
    this.getDetectionListType()
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
        Validators.maxLength(50),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.leaveComponentNames)
      ]],
      code: [null, [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^([a-zA-Z0-9])+$'),
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
      eligibilityBase:[0],
      maxLeaveAtATime:[null],
      vacationSalaryFormula:[null],
      encashBFCode:[{ value: null, disabled: this.isEncashBf }],
      encashLimitDays:[{ value: null, disabled: this.isEncashLimit }],
      cfLimitDays:[{ value: null, disabled: this.isCfLimit }],
      baseType:[null],
      isIncludeLOPDays:[null],
      leaveType:[null],
      leaveCutOffType:[null],
      isAccruedLeaveAmount:[false],
      isEncash:[false],
      isCarryForward:[false],
      leaveComponentId:[null],
      leaveDeduction:[null],
      leaveEncashment:[{ value: null, disabled: this.isEncash }],
      annualLeave:[{ value: null, disabled: this.isAnnual }],
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
        this.activeModal.close(result);
        
        this.toastr.showSuccessMessage('Configure Leave Component is created successfully!');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Leave Component');
      });
  }
}
