import { Component, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { OvertimePolicyService } from '../../overtime-policy/overtime-policy.service';
import { OvertimePolicyConfigurationService } from '../overtime-policy-configuration.service';
import { OvertimePolicy } from '../../overtime-policy/overtime-policy.model';
import { WorkFromHomePeriodType } from '../../../../../models/common/types/workfromhomeperiodtype';
import { OvertimePolicyCalculationComponent } from '../overtime-policy-calculation/overtime-policy-calculation.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { HolidayOvertime9 } from 'src/app/models/common/types/holidayOvertime';
import { NormalOverTime8 } from 'src/app/models/common/types/normalOvertime';
import { SpecialOvertime10 } from 'src/app/models/common/types/specialOvertime';
import { result } from 'lodash';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { OverTimeSlabGroup } from '@settings/overtime/overtime-slab/overtime-slab-model';
import { OverTimeSlabService } from '@settings/overtime/overtime-slab/overtime-slab-service';
import { OvertimeSlabCreateComponent } from '@settings/overtime/overtime-slab/overtime-slab-create/overtime-slab-create.component';
import { OvertimeSlabEditComponent } from '@settings/overtime/overtime-slab/overtime-slab-edit/overtime-slab-edit.component';
import { OvertimeSlabViewComponent } from '@settings/overtime/overtime-slab/overtime-slab-view/overtime-slab-view.component';

@Component({
  selector: 'hrms-overtime-policy-configuration-create',
  templateUrl: './overtime-policy-configuration-create.component.html'
})
export class OvertimePolicyConfigurationCreateComponent implements OnInit {

  @ViewChild("myTabSet") tabSet: NgbTabset;

  addForm: FormGroup;
  currentUserId: number;
  overtimePolicy: OvertimePolicy;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: number[];
  holidayOverTime;
  normalOverTime;
  specialOverTime;
  disableholiday:boolean;
  overtimeSlabDetails: OverTimeSlabGroup[] = [];
  id: any;
  isDisabled: boolean = true;
  isSaveDisable: boolean = false;
  activeTab: string = "configuration";
  overtimeFlagCheck: boolean=false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private overtimePolicyService: OvertimePolicyService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService,
    private overTimeSlabService:OverTimeSlabService,) { }
   

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.overtimePolicyConfigurationService.getNormalOverTime()
    .subscribe((result)=>{
      this.normalOverTime=result  
    })
    this.overtimePolicyConfigurationService.getHolidayOverTime()
    .subscribe((result)=>{
      this.holidayOverTime=result  
    })
    this.overtimePolicyConfigurationService.getSpecialOverTime()
    .subscribe((result)=>{
      this.specialOverTime=result  
    })

    this.periodTypeKeys = Object.keys(this.periodTypes).filter(Number).map(Number);

    // this.normalOverTimeKeys = Object.keys(this.normalOverTime).filter(Number).map(Number);
    // this.holidayOvertimeKeys = Object.keys(this.holidayOvertime).filter(Number).map(Number);
    // this.specialOvertimeKeys = Object.keys(this.specialOvertime).filter(Number).map(Number);
    this.route.params.subscribe(params => {
      this.getOvertimePolicy(params.overtimePolicyId);
      this.getOvertimeSlablist(params.overtimePolicyId)
      this.id=params.overtimePolicyId
    });

    this.onChanges();
    
  }

  onChanges(): void {
    this.addForm.get('isApprovalRequired').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('maximumLimit').enable();
        this.addForm.get('noticeDays').enable();
        this.addForm.get('periodType').enable();
      } else {
        this.addForm.get('noticeDays').disable();
        this.addForm.get('maximumLimit').disable();
        this.addForm.get('periodType').disable();

        this.addForm.patchValue({ maximumLimit: null, noticeDays: null, periodType: null });
      }
    });

    this.addForm.get('isPastDayRQPossible').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('maximumPastDayLimit').enable();
      } else {
        this.addForm.get('maximumPastDayLimit').disable();
        this.addForm.patchValue( {maximumPastDayLimit: null} );
      }
    });

    this.addForm.get('isRoundOffRequired').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('roundOffType').enable();
        this.addForm.patchValue( {isRoundOffNearest: true} );
      } else {
        this.addForm.get('roundOffType').disable();
        this.addForm.patchValue( {roundOffType: 1, isRoundOffNearest: false, isRoundOffLowest: false} );
      }
    });
    this.addForm.get('isovertimeslab').valueChanges.subscribe(value => {
      if (value) {
        this.overtimeFlagCheck=true
      } else {
        this.overtimeFlagCheck=false
      }
    });
    this.addForm.get('roundOffType').valueChanges.subscribe(value => {
      if (value === 1) {
        this.addForm.patchValue( {isRoundOffNearest: true} );
        this.addForm.patchValue( {isRoundOffLowest: false} );
      } else {
        this.addForm.patchValue( {isRoundOffNearest: false} );
        this.addForm.patchValue( {isRoundOffLowest: true} );
      }
    });
    // this.addForm.get('holidayFormula').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.addForm.get('holidayOverTime').enable(); 
    //     this.addForm.get('holidayOverTime').setValidators(Validators.required)

    //   }else{
    //     this.addForm.get('holidayOverTime').disable(); 
    //     this.addForm.get('holidayOverTime').reset(); 
    //   } 
    // }); 
    // this.addForm.get('specialFormula').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.addForm.get('specialOverTime').enable();
    //     this.addForm.get('specialOverTime').setValidators(Validators.required)

    //   }else{
    //     this.addForm.get('specialOverTime').disable();
    //     this.addForm.get('specialOverTime').reset(); 

    //   }
    // }); 
    // this.addForm.get('normalFormula').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.addForm.get('normalOverTime').enable();
    //     this.addForm.get('normalOverTime').setValidators(Validators.required)
    //   }else{
    //     this.addForm.get('normalOverTime').disable(); 
    //     this.addForm.get('normalOverTime').reset(); 
    //   }
    // }); 

   }

  getOvertimePolicy(overtimePolicyId) {
    this.overtimePolicyService.get(overtimePolicyId).subscribe((result) => {
      this.overtimePolicy = result;
      this.addForm.patchValue({
        overtimePolicyId: this.overtimePolicy.id,
        overtimePolicyName: this.overtimePolicy.name,
      });
    },
    error => {
      console.error(error);
    });
  }

  // openFormulaEditor(type: string) {
  //   const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
  //     { size: 'lg', centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.formulaType = type;
  //   modalRef.componentInstance.formula = '';

  //   modalRef.result.then((result) => { console.log(result);
  //                                      if (result !== 'Close click') {
  //       this.addForm.get(type).patchValue(result);
  //       console.log('reslt',result);

  //     }
  //   });
  // }

  onSubmit() {
    this.overtimePolicyConfigurationService.add(this.addForm.value).subscribe(() => {
      this.overtimePolicy.isConfigured = true;
      this.overtimePolicyService.update(this.overtimePolicy).subscribe(() => {
        this.toastr.showSuccessMessage('Overtime Policy configured successfully!');
        
        this.isSaveDisable = true;
        if(this.overtimeFlagCheck==true){
          this.isDisabled = false;
          this.activeTab = "slab";
        }else{
       this.router.navigate(['./settings/overtime']);
        }
       
      },
      error => {
        console.error(error);
      });
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to configure overtime policy');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      overtimePolicyId: [],
      overtimePolicyName: [],
      isApprovalRequired: [false],
      isCommentRequired: [false],
      isPastDayRQPossible: [false],
      isRoundOffRequired: [false],
      isRoundOffNearest: [false],
      isRoundOffLowest: [false],
      isovertimeslab:[false],
      normalOverTime:[0],
      holidayOverTime:[0],
      specialOverTime:[0],

      roundOffType: [{ value: 1, disabled: true }],
      noticeDays: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      maximumLimit: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      periodType: [{ value: null, disabled: true }, [
        Validators.required
      ]],
      maximumPastDayLimit: [{ value: null, disabled: true }, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      // lastDayLimit: [null, [
      //   Validators.required,
      //   Validators.min(1),
      //   Validators.max(999999999)
      // ]],
      // minimumOverTimeHour: [null, [
      //   Validators.required,
      //   Validators.min(1),
      //   Validators.max(999999999)
      // ]],
      timeBeyondShiftHour: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
    });
  }

  
  getOvertimeSlablist(id) {
    this.overTimeSlabService.getOvertimeDetail(id).subscribe(result => {
      this.overtimeSlabDetails = result;
      //this.overtimeSlabDetails=this.overtimeSlabDetails.sort((a, b) => a.overTimePolicyCode.toLowerCase().localeCompare(b.overTimePolicyCode.toLowerCase()));
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Overtime slab List Details');
    });
  }
  openCreate() {
    const modalRef = this.modalService.open(OvertimeSlabCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
       modalRef.componentInstance.code = this.overtimePolicy.name;
    modalRef.componentInstance.id= this.id;
    modalRef.result.then((result) => {
        if (result == 'submit') {
          this.getOvertimeSlablist(this.id)
        }
    });  
  }
  openEdit(relDetails: OverTimeSlabGroup) {
    const modalRef = this.modalService.open(OvertimeSlabEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.relDetails= relDetails;
    modalRef.componentInstance.code = this.overtimePolicy.name;
    modalRef.componentInstance.id = this.id;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimeSlablist(this.id)
      }
    });
  }
  openView(relDetails: OverTimeSlabGroup) {
    const modalRef = this.modalService.open(OvertimeSlabViewComponent,
      { size: 'lg',centered: true, backdrop: 'static' });

    modalRef.componentInstance.relDetails = relDetails;
    // modalRef.componentInstance.code = this.Codes;
    // modalRef.componentInstance.name = this.Names;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getOvertimeSlablist(this.id);
      }
    });
  }

delete(relDetails: OverTimeSlabGroup) {
  const modalRef = this.modalService.open(ConfirmModalComponent,
    { centered: true, backdrop: 'static' });
  modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the Overtime slab ${relDetails.overTimePolicyCode}`;
  modalRef.result.then((userResponse) => {
    if (userResponse == true) {
      this.overTimeSlabService.delete(relDetails.id).subscribe(() => {
        this.toastr.showSuccessMessage('Overtime slab deleted successfully!');
        this.getOvertimeSlablist(this.id)
      });
    }
  });
}
}




