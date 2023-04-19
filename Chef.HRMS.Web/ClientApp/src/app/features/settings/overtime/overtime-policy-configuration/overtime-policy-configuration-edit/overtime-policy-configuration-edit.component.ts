import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbTabset } from '@ng-bootstrap/ng-bootstrap';

import { OvertimePolicy } from '../../overtime-policy/overtime-policy.model';
import { OvertimePolicyService } from '../../overtime-policy/overtime-policy.service';
import { OvertimePolicyConfiguration } from '../overtime-policy-configuration.model';
import { OvertimePolicyConfigurationService } from '../overtime-policy-configuration.service';
import { WorkFromHomePeriodType } from '../../../../../models/common/types/workfromhomeperiodtype';
import { OvertimePolicyCalculationComponent } from '../overtime-policy-calculation/overtime-policy-calculation.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { OverTimeSlabGroup } from '@settings/overtime/overtime-slab/overtime-slab-model';
import { OverTimeSlabService } from '@settings/overtime/overtime-slab/overtime-slab-service';
import { OvertimeSlabCreateComponent } from '@settings/overtime/overtime-slab/overtime-slab-create/overtime-slab-create.component';
import { OvertimeSlabEditComponent } from '@settings/overtime/overtime-slab/overtime-slab-edit/overtime-slab-edit.component';
import { OvertimeSlabViewComponent } from '@settings/overtime/overtime-slab/overtime-slab-view/overtime-slab-view.component';

@Component({
  selector: 'hrms-overtime-policy-configuration-edit',
  templateUrl: './overtime-policy-configuration-edit.component.html'
})
export class OvertimePolicyConfigurationEditComponent implements OnInit {

  @ViewChild("myTabSet") tabSet: NgbTabset;
  
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
  overtimeSlabDetails: OverTimeSlabGroup[] = [];
  id: any;
  isDisabled: boolean = true;
  isSaveDisable: boolean = false;
  activeTab: string = "configuration";

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
    this.editForm = this.createFormGroup();
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
      this.getOvertimeSlablist(params.overtimePolicyId)
      this.id=params.overtimePolicyId
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
    
  }

  // openFormulaEditor(type: string) {
  //   debugger
  //   const modalRef = this.modalService.open(OvertimePolicyCalculationComponent,
  //     { size: 'lg', centered: true, backdrop: 'static' });

  //   modalRef.componentInstance.formulaType = type;
  //   modalRef.componentInstance.formula = this.editForm.get(type).value;

  //   modalRef.result.then((result) => { console.log(result);
  //       if (result !== 'Close click') {
  //       this.editForm.get(type).patchValue(result);        
  //     }
  //   });
  // }

  onSubmit() {
    debugger
    console.log(this.editForm.value)
    this.overtimePolicyConfigurationService.update(this.editForm.value).subscribe(() => {
      this.toastr.showSuccessMessage('Overtime Policy configured successfully!');
      //this.router.navigate(['./settings/overtime']);
      this.isSaveDisable = true;
      this.isDisabled = false;
      this.activeTab = "slab";
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
      createdDate: [],
    });
  }

  getOvertimeSlablist(id) {
    debugger
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
    debugger
    const modalRef = this.modalService.open(OvertimeSlabCreateComponent,
      {size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.code = this.overtimePolicy.name;
    modalRef.componentInstance.id = this.id;
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
