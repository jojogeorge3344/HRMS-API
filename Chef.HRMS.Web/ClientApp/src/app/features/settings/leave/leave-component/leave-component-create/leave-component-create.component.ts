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
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { LeaveSlabGroup } from '../leave-slab.model';
import { LeaveSlabViewComponent } from '../leave-slab-view/leave-slab-view.component';
import { LeaveSlabEditComponent } from '../leave-slab-edit/leave-slab-edit.component';
import { LeaveSlabCreateComponent } from '../leave-slab-create/leave-slab-create.component';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';


@Component({
  selector: "hrms-leave-component-create",
  templateUrl: "./leave-component-create.component.html",
  styleUrls: ['./leave-component-create.component.scss']

})
export class LeaveComponentCreateComponent implements OnInit {
  @Input() leaveComponentNames: string[];
  @Input() leaveComponentCodes: string[];
  @ViewChild("myTabSet") tabSet: NgbTabset;

  addForm: FormGroup;
  addForm2: FormGroup;

  genderTypes = GenderType;
  maritalStatusTypes = MaritalStatusType;
  basetype = BaseType;
  eligiblitybase = EligiblityBase;
  leavecutofftype = LeaveCutoffType;
  leavetypes = LeaveType;
  lopdays = Loptype;

  currentUserId: number;
  leavetypearray: number[];
  lopday: number[];
  leavecutoff: number[];
  basetypes: number[];
  eligiblitybases: number[];
  dedecutionarray: [];
  leavetype: [];
  leaveComponentId: number;

  genderTypeKeys: number[];
  maritalStatusTypeKeys: number[];

  isDisabled: boolean = true;
  isCfLimit: boolean = true;
  isEncash: boolean = true;
  isAnnual: boolean = true;
  isEncashBf: boolean = true;
  isEncashLimit: boolean = true;
  detectionTypeList: any;
  accuralList: any;
  accuralBenefitList: any;
  encashBfList: any;
  //leaveDetails: any;
  valuetype: object;
  valueSlabOffTypeKeys: number[];
  valueSlabOffType = valueTypeOff;
  leaveComponentsList: any;
  leaveSlabDetails: LeaveSlabGroup[] = [];
 
  isSaveDisable: boolean = false;
  isSaveDisableConfig: boolean = false;
  activeTab: string = "basic";
  isSlabdisabled: boolean=true;
  backToBasic: any;
  configId: any;
  leaveDetectionSettings:IDropdownSettings={};
  selectedLeaveDetection;
  leaveDeduction;
  isMandatoryAccruel:boolean=false
  isAccurel:boolean=true

  constructor(
    private leaveComponentService: LeaveComponentService,
    private leaveEligiblityService: LeaveEligiblityService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    public leaveSlabService: LeaveSlabService,
    ) {
  }

  ngOnInit(): void {
    this.genderTypeKeys = Object.keys(this.genderTypes)
      .filter(Number)
      .map(Number);
    this.basetypes = Object.keys(this.basetype).filter(Number).map(Number);
    this.maritalStatusTypeKeys = Object.keys(this.maritalStatusTypes)
      .filter(Number)
      .map(Number);
    this.eligiblitybases = Object.keys(this.eligiblitybase)
      .filter(Number)
      .map(Number);
    this.leavecutoff = Object.keys(this.leavecutofftype)
      .filter(Number)
      .map(Number);
    this.leavetypearray = Object.keys(this.leavetypes)
      .filter(Number)
      .map(Number);
    this.lopday = Object.keys(this.lopdays).filter(Number).map(Number);

    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addForm2 = this.createFormGroup2();

    this.getDeductionType();
    this.getAccrualBenefitType();
    this.getAccrualType();
    this.getDetectionListType();
    this.getEncashBF();
  }

  getDeductionType() {
    this.leaveComponentService.getbenefitcategory().subscribe((result: any) => {
      this.dedecutionarray = result;
    });
  }

  getLeavetype() {
    let categoryid = this.addForm.value.benefitCategoryId;
    this.leaveComponentService
      .getbenefittype(categoryid)
      .subscribe((result: any) => {
        this.leavetype = result;
      });
  }

  toggleGender(checked) {
    if (checked) {
      this.addForm.addControl(
        "restrictedToGender",
        new FormControl(null, Validators.required)
      );
    } else {
      this.addForm.removeControl("restrictedToGender");
    }
  }

  toggleMaritalStatus(checked) {
    if (checked) {
      this.addForm.addControl(
        "restrictedToMaritalStatus",
        new FormControl(null, Validators.required)
      );
    } else {
      this.addForm.removeControl("restrictedToMaritalStatus");
    }
  }

  get name() {
    return this.addForm.get("name");
  }

  get code() {
    return this.addForm.get("code");
  }

  onSubmit() {
    if(this.addForm.value.isPaidLeave==true || this.addForm.value.isUnpaidLeave==true || this.addForm.value.isSickLeave==true)
      {
        if(this.addForm.value.id){
          if(this.activeTab=="configure"){
            this.activeTab = "slab";
           }
           
          this.leaveComponentService.update(this.addForm.getRawValue()).subscribe(
            (result: any) => {
              if (result === -1) {
                this.toastr.showErrorMessage("Leave component already exists!");
              } else {
                this.toastr.showSuccessMessage(
                  "Leave component is updated successfully!"
                );
                this.activeTab = "configure";
                
              }
            },
            (error) => {
              console.error(error);
              this.toastr.showErrorMessage("Unable to update the leave component");
            }
          );
        }else{
          this.leaveComponentService.add(this.addForm.value).subscribe(
            (result: any) => {
              console.log(result)
              this.backToBasic=result
              this.addForm.patchValue({
                id:this.backToBasic,
              })
              if (result.id === -1) {
                this.toastr.showErrorMessage("Leave component already exists!");
              } else {
                this.leaveComponentId = result;
      
                this.toastr.showSuccessMessage(
                  "Basic Leave Component is created successfully!"
                );
                this.isSaveDisable = true;
                this.isDisabled = false;
      
                this.activeTab = "configure";
              }
            },
            (error) => {
              console.error(error);
              this.toastr.showErrorMessage("Unable to add the Basic Leave Component");
            }
          );
        }
       
    }else{
      this.toastr.showWarningMessage("Please choose  one leave category!");
    }
  }

  getDetectionListType() {
    this.leaveComponentService.getDetectiontype().subscribe((res) => {
      this.detectionTypeList = res;
      this.leaveDetectionSettings = {
        idField:'id',
        textField:'name',
        allowSearchFilter: true
      };  
    });
  }

  getAccrualType() {
    this.leaveComponentService.getAccrualtype().subscribe((res) => {
      this.accuralList = res;
    });
  }

  getAccrualBenefitType() {
    this.leaveComponentService.getAccrualBenefittype().subscribe((res) => {
      this.accuralBenefitList = res;
    });
  }

  getCarry(event) {
    debugger;
    if (event == "true") {
      this.addForm2.get("cfLimitDays").enable();
      this.isCfLimit = false;
    } else {
      this.addForm2.get("cfLimitDays").disable();
      this.isCfLimit = true;
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }

  getLeave(event) {
    debugger;
    if (this.addForm2.value.leaveType == 1) {
      this.addForm2.get("leaveEncashment").enable();
      this.addForm2.get("annualLeave").enable();
      this.addForm2.get("accruedLeaveAmount").enable();
      this.isMandatoryAccruel=true
      this.isAccurel=false
      this.isEncash = false;
      this.isAnnual = false;
    } else {
      this.addForm2.get("leaveEncashment").disable();
      this.addForm2.get("annualLeave").disable();
      this.addForm2.get("accruedLeaveAmount").disable();
      this.isMandatoryAccruel=false
      this.isAccurel=true
      this.isEncash = true;
      this.isAnnual = true;
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }

  getCash(event) {
    debugger;
    if (event == "true") {
      this.addForm2.get("encashBFCode").enable();
      this.addForm2.get("encashLimitDays").enable();
      this.isEncashBf = false;
      this.isEncashLimit = false;
    } else {
      this.addForm2.get("encashBFCode").disable();
      this.addForm2.get("encashLimitDays").disable();
      this.isEncashBf = true;
      this.isEncashLimit = true;
      // this.addForm.controls['cfLimitDays'].reset();
    }
  }

  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(
      OvertimePolicyCalculationComponent,
      { size: "lg", centered: true, backdrop: "static" }
    );

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = "";

    modalRef.result.then((result) => {
      console.log(result);
      if (result !== "Close click") {
        this.addForm2.get(type).patchValue(result);
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id:[0],
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
      isUnpaidLeave:[false],
      isSickLeave: [false],
      isStatutoryLeave: [false],
      isRestrictedToGender: [false],
      isRestrictedToMaritalStatus: [false],
      benefitCategoryId: [0, [Validators.required]],
      benefitTypeId: [0, [Validators.required]],
    });
  }

  createFormGroup2(): FormGroup {
    return this.formBuilder.group({
      id:[0],
      eligibleDays: [null,[Validators.required]],
      eligibilityBase: [0, [Validators.required]],
      maxLeaveAtATime: [0],
      vacationSalaryFormula: [null],
      encashBFCode: [{ value: 0, disabled: this.isEncashBf }],
      encashLimitDays: [{ value: 0, disabled: this.isEncashLimit }],
      cfLimitDays: [{ value: 0, disabled: this.isCfLimit }],
      baseType: [null, [Validators.required]],
      isIncludeLOPDays: [null, [Validators.required]],
      leaveType: [null, [Validators.required]],
      leaveCutOffType: [null, [Validators.required]],
      accruedLeaveAmount: [{ value: null, disabled: this.isAccurel }, [Validators.required]],
      isEncash: [false, [Validators.required]],
      // isCarryForward: [false, [Validators.required]],
      leaveComponentId: [null],
      // leaveDeduction: ['',[Validators.required]],
      leaveEncashment: [{ value: 0, disabled: this.isEncash }],
      annualLeave: [{ value: 0, disabled: this.isAnnual }],
      leaveComponentLopDetails:[]
    });
  }

  onSubmit2() {
    debugger
    let selectedIds=this.selectedLeaveDetection
    let arrValue = selectedIds.map(({id}) =>id);
    this.leaveDeduction = arrValue.join()
    var payrollcomponet =[]
    selectedIds.forEach((key) => {
      payrollcomponet.push({id:0,leaveComponentId:this.leaveComponentId,payrollComponentId : key.id})
    });
    this.addForm2.patchValue({
      leaveComponentLopDetails : payrollcomponet,
    })
    if(this.activeTab=="slab"){
      this.activeTab = "configure";
     }
    this.addForm2.patchValue({
      leaveComponentId: this.leaveComponentId,
    });
    if(this.addForm2.value.leaveType==2){
      this.addForm2.value.accruedLeaveAmount = null
    }
    if(this.addForm2.value.id){
      this.leaveEligiblityService.update(this.addForm2.value).subscribe(
        (result: any) => {
         // this.activeModal.close(true);
       
        //  this.isSaveDisableConfig=true
        if(this.addForm.value.isPaidLeave==true || this.addForm.value.isSickLeave==true){
          this.isSlabdisabled=false
          this.activeTab = "slab";
          this.isSaveDisableConfig=true
        }else{
          this.activeModal.close(true);
        }
          this.toastr.showSuccessMessage(
            "Leave component is updated successfully!"
          );
          
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage("Unable to update the leave component");
        }
      );
    }else{
      this.leaveEligiblityService.add(this.addForm2.value).subscribe(
        (result: any) => {
          if (result.id === -1) {
            this.toastr.showErrorMessage(
              "Configure Leave component already exists!"
            );
          } else {
            // this.activeModal.close(true);
            
          if(this.addForm.value.isPaidLeave==true || this.addForm.value.isSickLeave==true){
            this.isSlabdisabled=false
            this.activeTab = "slab";
            this.isSaveDisableConfig=true
          }else{
            this.activeModal.close(true);
          } 
            this.toastr.showSuccessMessage(
              "Configure Leave Component is created successfully!"
            );
            this.getConfigureData()
            this.getLeaveSlablist(this.leaveComponentId)
            
          }
        },
        (error) => {
          console.error(error);
          this.toastr.showErrorMessage("Unable to add the Leave Component");
        }
      );
    }
   
  }

  getEncashBF() {
    this.leaveEligiblityService.getBenefitType().subscribe((res) => {
      this.encashBfList = res;
    });
  }
 

  getLeaveSlablist(id) {
    debugger
    this.leaveSlabService.getLeaveComponentDetails(id).subscribe(result => {
      this.leaveSlabDetails = result;
      this.leaveSlabDetails=this.leaveSlabDetails.sort((a, b) => a.leaveComponentName.toLowerCase().localeCompare(b.leaveComponentName.toLowerCase()));
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the LeaveSlab List Details');
    });
  }
  openCreate() {
    debugger
    const modalRef = this.modalService.open(LeaveSlabCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.addForm.value.code;
    modalRef.componentInstance.name= this.addForm.value.name;
    modalRef.componentInstance.id= this.leaveComponentId;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getLeaveSlablist(this.leaveComponentId)
        }
    });  
  }
  openEdit(relDetails: LeaveSlabGroup) {
    const modalRef = this.modalService.open(LeaveSlabEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    modalRef.componentInstance.code = this.addForm.value.code;;
    modalRef.componentInstance.name = this.addForm.value.name;
    modalRef.componentInstance.id= this.leaveComponentId;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getLeaveSlablist(this.leaveComponentId)
      }
    });
  }
  openView(relDetails: LeaveSlabGroup) {
    const modalRef = this.modalService.open(LeaveSlabViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getLeaveSlablist(this.leaveComponentId);
      }
    });
  }

delete(relDetails: LeaveSlabGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the LeaveSlab ${relDetails.leaveComponentName}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.leaveSlabService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('LeaveSlab deleted successfully!');
        this.getLeaveSlablist(this.leaveComponentId)
      });
    }
  });
}

  // createFormGroup3(): FormGroup {
  //   return this.formBuilder.group({
  //     leaveComponentCode: ['', [
  //       Validators.required
  //     ]],
  //     leaveComponentName: ['', [
  //       Validators.required
  //     ]],
  //     lowerLimit: ['', [
  //       Validators.required
  //     ]],
  //     upperLimit: ['', [
  //       Validators.required
  //     ]],
  //     valueVariable: ['', [
  //       Validators.required
  //     ]],
  //     valueType: ['', [
  //       Validators.required
  //     ]],
  //     leaveComponentId: ['', ],
  //   })
  // }
  
  // onSubmit3() {

  //   this.addForm3.patchValue({
  //     leaveComponentId:this.leavecomponentid
  //   })
  //   this.leaveSlabService.add(this.addForm3.value).subscribe((result: any) => {
  //     if (result.id === -1) {
  //       this.toastr.showErrorMessage('Configure Slab component already exists!');
  //     } else {
  //       this.activeModal.close(result);
        
  //       this.toastr.showSuccessMessage('Configure Slab Component is created successfully!');
        
  //     }
  //   },
  //     error => {
  //       console.error(error);
  //       this.toastr.showErrorMessage('Unable to add the Slab Component');
  //     });
  // }

 // getWholeDetails(){
  //   debugger
  // this.leaveComponentService.getAll().subscribe(res => {
  //   this.leaveComponentsList = res
  //   let a=this.leaveComponentsList.filter((value)=>value.code==this.addForm.value.code)
  //   this.addForm3.patchValue({
  //     leaveComponentCode:a[0].code,
  //     leaveComponentName:a[0].name,
  //   })
  // })
  // }

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
  getConfigureData() {
    this.leaveEligiblityService.get(this.backToBasic).subscribe((res) => {
      this.configId=res[0].id
      if(this.configId){
        this.addForm2.patchValue({
          id: this.configId,
        });
      }
    }
    )
  }
  paidLeaveChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isUnpaidLeave:false,
        isSickLeave:false
      })
     
    }

  }
  unpaidLeaveChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isPaidLeave:false,
        isSickLeave:false
      })
    }

  }
  sickLeaveChecked(event){
    if(event=='on'){
      this.addForm.patchValue({
        isUnpaidLeave:false,
        isPaidLeave:false
      })
    }

  }
}
