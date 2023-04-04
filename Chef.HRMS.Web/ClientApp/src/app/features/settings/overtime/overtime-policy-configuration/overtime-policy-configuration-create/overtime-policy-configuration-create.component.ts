import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

@Component({
  selector: 'hrms-overtime-policy-configuration-create',
  templateUrl: './overtime-policy-configuration-create.component.html'
})
export class OvertimePolicyConfigurationCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  overtimePolicy: OvertimePolicy;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: number[];
  holidayOverTime;
  normalOverTime;
  specialOverTime;
  disableholiday:boolean;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private overtimePolicyService: OvertimePolicyService,
    private overtimePolicyConfigurationService: OvertimePolicyConfigurationService) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.addForm.get('holidayOverTime').disable();
    this.addForm.get('normalOverTime').disable();
    this.addForm.get('specialOverTime').disable();
    debugger

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

    this.addForm.get('roundOffType').valueChanges.subscribe(value => {
      if (value === 1) {
        this.addForm.patchValue( {isRoundOffNearest: true} );
        this.addForm.patchValue( {isRoundOffLowest: false} );
      } else {
        this.addForm.patchValue( {isRoundOffNearest: false} );
        this.addForm.patchValue( {isRoundOffLowest: true} );
      }
    });
    this.addForm.get('holidayFormula').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('holidayOverTime').enable(); 
      }else{
        this.addForm.get('holidayOverTime').disable(); 
      } 
    }); 
    this.addForm.get('specialFormula').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('specialOverTime').enable();
      }else{
        this.addForm.get('specialOverTime').disable();
      }
    }); 
    this.addForm.get('normalFormula').valueChanges.subscribe(value => {
      if (value) {
        this.addForm.get('normalOverTime').enable();
      }else{
        this.addForm.get('normalOverTime').disable(); 
      }
    }); 

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

  openFormulaEditor(type: string) {
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = '';

    modalRef.result.then((result) => { console.log(result);
                                       if (result !== 'Close click') {
        this.addForm.get(type).patchValue(result);
        console.log('reslt',result);

      }
    });
  }

  onSubmit() {
    debugger
    this.overtimePolicyConfigurationService.add(this.addForm.value).subscribe(() => {
      this.overtimePolicy.isConfigured = true;
      this.overtimePolicyService.update(this.overtimePolicy).subscribe(() => {
        this.toastr.showSuccessMessage('Overtime Policy configured successfully!');
        this.router.navigate(['./settings/overtime']);
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
      normalOverTime:[null,[
        Validators.required]],
      holidayOverTime:[null,[
        Validators.required,]],
      specialOverTime:[null,[
        Validators.required,]],

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
      lastDayLimit: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      minimumOverTimeHour: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      timeBeyondShiftHour: [null, [
        Validators.required,
        Validators.min(1),
        Validators.max(999999999)
      ]],
      normalFormula: ['', [
        Validators.required,
        Validators.maxLength(256)
      ]],
      holidayFormula: ['', [
        // Validators.required,
        Validators.maxLength(256)
      ]],
      specialFormula: ['', [
        // Validators.required,
        Validators.maxLength(256)
      ]]
    });
  }
}
