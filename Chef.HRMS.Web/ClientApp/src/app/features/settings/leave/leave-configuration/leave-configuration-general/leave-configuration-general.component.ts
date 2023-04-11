import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveConfigurationGeneralService } from '../leave-configuration-general.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { LeaveConfiguration } from '../leave-configuration.model';

@Component({
  selector: 'hrms-leave-configuration-general',
  templateUrl: './leave-configuration-general.component.html'
})
export class LeaveConfigurationGeneralComponent implements OnChanges {

  editForm: FormGroup;
  currentUserId: number;
  viewValue: boolean;

  @Input() leaveStructureId: number;
  @Input() leaveComponentId: number;
  @Input() assignedLeaveConfigurations;

  @Input() isView: boolean;
  @Output() saveConfiguration = new EventEmitter<boolean>();
  isInvalid: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private leaveConfigurationGeneralService: LeaveConfigurationGeneralService,
    private toastr: ToasterDisplayService,
    private router: Router) {
  }
  ngOnInit(){
    
    let href = this.router.url.split('/');   
    if(href.includes('view')){
      this.viewValue = true;
    }
    else{
      this.viewValue = false;
    }
    if(this.viewValue == true){
      this.editForm.disable();
    }
    if(this.assignedLeaveConfigurations){
  this.editForm.patchValue({
  annualLeaveQuota:this.assignedLeaveConfigurations[0].eligibleDays,
  maxConsecutiveDays:this.assignedLeaveConfigurations[0].eligibilityBase,
  maxNumberOfDaysPerMonth:this.assignedLeaveConfigurations[0].maxLeaveAtaTime
})
    }
    
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currentUserId = getCurrentUserId();

    if (changes.leaveComponentId) {
      this.editForm = this.createFormGroup();
      this.getLeaveGeneralSettings();
    }
  }

  getLeaveGeneralSettings() {
    debugger
    this.leaveConfigurationGeneralService.get(this.leaveStructureId, this.leaveComponentId).subscribe((result: any) => {
      if (result) {
        this.editForm.patchValue(result);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the general settings');
      }
    );
  }

  onSubmit() {
    this.editForm.patchValue({ isConfigured: true });
    this.leaveConfigurationGeneralService.update(this.editForm.value)
      .subscribe(() => {
        this.toastr.showSuccessMessage('Leave General Settings is updated successfully!');
        this.saveConfiguration.emit(true);
      },
        error => {
          this.saveConfiguration.emit(false);
          this.toastr.showErrorMessage('Unable to update the Leave General Settings');
          console.error(error);
        });
  }
  onChange(event: any): void {
    const value = Number(event.value);
    if (this.editForm.get('annualLeaveQuota').value != null) {
      if (value > this.editForm.get('annualLeaveQuota').value) {
      this.isInvalid = true;
      } else {
      this.isInvalid = false;
      }
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      annualLeaveQuota: [0, [
        Validators.required,
        Validators.min(1),
        Validators.max(365)
      ]],
      maxConsecutiveDays: [0, [
        Validators.min(0),
        Validators.required]],
      // maxNumberOfDaysPerMonth: [0],
      maxNumberOfDaysPerMonth: [0, [
        Validators.required,
        Validators.min(1),
        Validators.max(365)]],
      numberOfDaysGapRequiredBetweenLeaves: [0, [
        Validators.min(0)]],
      noLeaveQuotaAfterJoiningDay: [0, [Validators.min(0)]],
      priorNoticeDays: [0, [Validators.min(0)]],
      allocateLeaveQuotaAt: [0],
      balanceRoundOff: [0],
      leaveBalancesAtTheYearEnd: [0],
      negativeLeaveBalancesAtTheYearEnd: [0],
      leaveStructureId: [0],
      leaveComponentId: [0],
      createdDate: []
    });
  }
}
