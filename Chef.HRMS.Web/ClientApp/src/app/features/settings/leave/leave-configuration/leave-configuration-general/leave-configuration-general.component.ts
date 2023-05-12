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
  maxCarryForwardDisable =false;

  @Input() leaveStructureId: number;
  @Input() leaveComponentId: number;
  @Input() assignedLeaveConfigurations;
  @Input() activeIndex:number;

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
    this.setConfigurationDetails(this.activeIndex)
    // if (this.assignedLeaveConfigurations) {
    //   this.editForm.patchValue({
    //     annualLeaveQuota: this.assignedLeaveConfigurations[0].eligibleDays,
    //    // maxConsecutiveDays: this.assignedLeaveConfigurations[0].eligibilityBase,
    //      maxConsecutiveDays:this.assignedLeaveConfigurations[0].maxLeaveAtaTime,
    //    // maxNumberOfDaysPerMonth: this.assignedLeaveConfigurations[0].maxLeaveAtaTime,
    //     leaveBalancesAtTheYearEnd:this.assignedLeaveConfigurations[0].isCarryForward == true ? 3 :'',
    //     maxCarryForwardDays:this.assignedLeaveConfigurations[0].cfLimitDays
       
    //   })

    //   this.maxCarryForwardDisable = this.assignedLeaveConfigurations[0].cfLimitDays > 0 && this.assignedLeaveConfigurations[0].isCarryForward == true ? true  : false
    
    // }

  }

  // setConfigurationDetails(index){
  //   debugger
  //   if (this.assignedLeaveConfigurations) {
  //     console.log('data',this.assignedLeaveConfigurations)
  //     this.editForm.patchValue({
  //       annualLeaveQuota: this.assignedLeaveConfigurations[index].eligibleDays,
  //      // maxConsecutiveDays: this.assignedLeaveConfigurations[0].eligibilityBase,
  //        maxConsecutiveDays:this.assignedLeaveConfigurations[index].maxLeaveAtaTime,
  //      // maxNumberOfDaysPerMonth: this.assignedLeaveConfigurations[0].maxLeaveAtaTime,
  //       leaveBalancesAtTheYearEnd:this.assignedLeaveConfigurations[index].isCarryForward == true ? 3 :0,
  //       maxCarryForwardDays:this.assignedLeaveConfigurations[index].cfLimitDays
       
  //     })

  //     this.maxCarryForwardDisable = this.assignedLeaveConfigurations[index].cfLimitDays > 0 && this.assignedLeaveConfigurations[index].isCarryForward == true ? true  : false
  //   }

  // }


  setConfigurationDetails(index){
    var componetIdIndex
    if (this.assignedLeaveConfigurations) {
      for(let i=0;i < this.assignedLeaveConfigurations.length;i++){
           if(index == this.assignedLeaveConfigurations[i].leaveComponentId){
            componetIdIndex = i
           }
      }
      this.editForm.patchValue({
        annualLeaveQuota: this.assignedLeaveConfigurations[componetIdIndex].eligibleDays,
       // maxConsecutiveDays: this.assignedLeaveConfigurations[0].eligibilityBase,
         maxConsecutiveDays:this.assignedLeaveConfigurations[componetIdIndex].maxLeaveAtaTime,
       // maxNumberOfDaysPerMonth: this.assignedLeaveConfigurations[0].maxLeaveAtaTime,
        leaveBalancesAtTheYearEnd:this.assignedLeaveConfigurations[componetIdIndex].isCarryForward == true ? 3 :0,
        maxCarryForwardDays:this.assignedLeaveConfigurations[componetIdIndex].cfLimitDays
    
      })

      this.maxCarryForwardDisable = this.assignedLeaveConfigurations[componetIdIndex].cfLimitDays > 0 && this.assignedLeaveConfigurations[componetIdIndex].isCarryForward == true ? true  : false
    }

  }



  ngOnChanges(changes: SimpleChanges) {
    this.currentUserId = getCurrentUserId();

    if (changes.leaveComponentId) {
      this.editForm = this.createFormGroup();
      this.getLeaveGeneralSettings();
    }
    this.setConfigurationDetails(this.activeIndex)
  }

  getLeaveGeneralSettings() {
    this.leaveConfigurationGeneralService.get(this.leaveStructureId, this.leaveComponentId).subscribe((result: any) => {
      if (result) {
        this.editForm.patchValue(result);
        this.setConfigurationDetails(this.activeIndex)
      }
      
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the general settings');
      }
    );
  }

  onSubmit() {
    this.editForm.value.leaveBalancesAtTheYearEnd = this.editForm.value.leaveBalancesAtTheYearEnd == "" ? 0 : parseInt(this.editForm.value.leaveBalancesAtTheYearEnd)
    this.editForm.patchValue({ 
      isConfigured: true,
      leaveComponentId :this.leaveComponentId,
      leaveStructureId :this.leaveStructureId
     });
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
        // Validators.required,
        Validators.min(0),
        Validators.max(365)
      ]],
      maxConsecutiveDays: [0, [
        Validators.min(0),
        Validators.required]],
        maxCarryForwardDays: [0, [
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
      //createdDate: []
      createdDate: [new Date()]
    });
  }
}
