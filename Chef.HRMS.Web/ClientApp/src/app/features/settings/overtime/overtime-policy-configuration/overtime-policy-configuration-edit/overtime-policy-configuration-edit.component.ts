import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { OvertimePolicy } from '../../overtime-policy/overtime-policy.model';
import { OvertimePolicyService } from '../../overtime-policy/overtime-policy.service';
import { OvertimePolicyConfiguration } from '../overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '../overtime-policy-configuration.service';
import { WorkFromHomePeriodType } from '../../../../../models/common/types/workfromhomeperiodtype';
import { OvertimePolicyCalculationComponent } from '../overtime-policy-calculation/overtime-policy-calculation.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-overtime-policy-configuration-edit',
  templateUrl: './overtime-policy-configuration-edit.component.html'
})
export class OvertimePolicyConfigurationEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  overtimePolicy: OvertimePolicy;
  overtimePolicyConfiguration: OvertimePolicyConfiguration;
  periodTypes = WorkFromHomePeriodType;
  periodTypeKeys: number[];
  holidayOverTime;
  normalOverTime;
  specialOverTime;
  required:boolean;

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
    this.editForm = this.createFormGroup();
    this.editForm.get('holidayOverTime').disable();
    this.editForm.get('normalOverTime').disable();
    this.editForm.get('specialOverTime').disable();
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
    this.onChanges();

    this.route.params.subscribe(params => {
      this.getOvertimePolicy(params.overtimePolicyId);
      this.getOvertimeConfiguration(params.overtimePolicyId);
    });

  }

  getOvertimePolicy(overtimePolicyId) {
    debugger
    this.overtimePolicyService.get(overtimePolicyId).subscribe((result) => {
      this.overtimePolicy = result;
      this.editForm.patchValue({
        overtimePolicyId: this.overtimePolicy.id,
        overtimePolicyName: this.overtimePolicy.name,
      });
    },
    error => {
      console.error(error);
    });
  }

  getOvertimeConfiguration(overtimePolicyId) {
    debugger
    this.overtimePolicyConfigurationService.getByOverTimePolicyId(overtimePolicyId).subscribe((result) => {
      this.overtimePolicyConfiguration = result;
      this.editForm.patchValue(this.overtimePolicyConfiguration);
    },
    error => {
      console.error(error);
    });
  }

  onChanges(): void {
    this.editForm.get('isApprovalRequired').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('maximumLimit').enable();
        this.editForm.get('noticeDays').enable();
        this.editForm.get('periodType').enable();
      } else {
        this.editForm.get('noticeDays').disable();
        this.editForm.get('maximumLimit').disable();
        this.editForm.get('periodType').disable();

        this.editForm.patchValue({ maximumLimit: null, noticeDays: null, periodType: null });
      }
    });

    this.editForm.get('isPastDayRQPossible').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('maximumPastDayLimit').enable();
      } else {
        this.editForm.get('maximumPastDayLimit').disable();
        this.editForm.patchValue( {maximumPastDayLimit: null} );
      }
    });

    this.editForm.get('isRoundOffRequired').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('roundOffType').enable();
        this.editForm.patchValue( {isRoundOffNearest: true} );
      } else {
        this.editForm.get('roundOffType').disable();
        this.editForm.patchValue( {roundOffType: 1, isRoundOffNearest: false, isRoundOffLowest: false} );
      }
    });

    this.editForm.get('roundOffType').valueChanges.subscribe(value => {
      if (value === 1) {
        this.editForm.patchValue( {isRoundOffNearest: true} );
        this.editForm.patchValue( {isRoundOffLowest: false} );
      } else {
        this.editForm.patchValue( {isRoundOffNearest: false} );
        this.editForm.patchValue( {isRoundOffLowest: true} );
      }
    });
    this.editForm.get('holidayFormula').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('holidayOverTime').enable(); 
        this.editForm.controls['holidayOverTime'].setValidators([Validators.required]);
      } else{
        this.editForm.get('holidayOverTime').disable(); 
        this.editForm.get('holidayOverTime').reset();
      }
      this.editForm.controls['holidayOverTime'].updateValueAndValidity();
    }); 
    this.editForm.get('specialFormula').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('specialOverTime').enable();
        this.editForm.controls['specialOverTime'].setValidators([Validators.required]);
      }else{
        this.editForm.get('specialOverTime').disable();
        this.editForm.get('specialOverTime').reset();
      }
      this.editForm.controls['specialOverTime'].updateValueAndValidity();
    }); 
    this.editForm.get('normalFormula').valueChanges.subscribe(value => {
      if (value) {
        this.editForm.get('normalOverTime').enable();
        this.editForm.controls['normalOverTime'].setValidators([Validators.required]);
      }else{
        this.editForm.get('normalOverTime').disable();
        this.editForm.get('normalOverTime').reset();
      }
      this.editForm.controls['normalOverTime'].updateValueAndValidity();
    }); 
  }

  openFormulaEditor(type: string) {
    debugger
    const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.formulaType = type;
    modalRef.componentInstance.formula = this.editForm.get(type).value;

    modalRef.result.then((result) => { console.log(result);
        if (result !== 'Close click') {
        this.editForm.get(type).patchValue(result);        
      }
    });
  }

  onSubmit() {
    debugger
    console.log(this.editForm.value)
    this.overtimePolicyConfigurationService.update(this.editForm.value).subscribe(() => {
      this.toastr.showSuccessMessage('Overtime Policy configured successfully!');
      this.router.navigate(['./settings/overtime']);
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to configure overtime policy');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      overtimePolicyId: [null],
      overtimePolicyName: [null],
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
        Validators.maxLength(256)
      ]],
      holidayFormula: ['', [
        Validators.maxLength(256)
      ]],
      specialFormula: ['', [
        Validators.maxLength(256)
      ]],
      createdDate: [],
    });
  }
}
