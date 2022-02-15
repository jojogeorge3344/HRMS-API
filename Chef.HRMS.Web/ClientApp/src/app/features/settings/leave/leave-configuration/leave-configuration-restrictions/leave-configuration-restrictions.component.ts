import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { LeaveConfigurationRestrictionsService } from '../leave-configuration-restrictions.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'hrms-leave-configuration-restrictions',
  templateUrl: './leave-configuration-restrictions.component.html'
})
export class LeaveConfigurationRestrictionsComponent implements OnChanges {

  currentUserId: number;
  editForm: FormGroup;
  viewValue: boolean;

  @Input() leaveStructureId: number;
  @Input() leaveComponentId: number;

  @Input() isView: boolean;
  @Output() saveConfiguration = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private leaveConfigurationRestrictionsService: LeaveConfigurationRestrictionsService,
    private toastr: ToasterDisplayService,
    private router: Router) {}

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
      
    }

  ngOnChanges(changes: SimpleChanges) {
    this.currentUserId = getCurrentUserId();

    if (changes.leaveComponentId) {
      this.editForm = this.createFormGroup();
      this.getLeaveGeneralSettings();
    }
  }

  getLeaveGeneralSettings() {
    this.leaveConfigurationRestrictionsService.get(this.leaveStructureId, this.leaveComponentId).subscribe((result: any) => {
      if (result) {
        this.editForm.patchValue(result);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the restriction settings');
      }
    );
  }

  onSubmit() {
    this.leaveConfigurationRestrictionsService.update(this.editForm.value)
      .subscribe(result => {
        this.toastr.showSuccessMessage('Leave Restriction Settings is updated successfully!');
        this.saveConfiguration.emit(this.editForm.value);
        // this.router.navigateByUrl('/leavesettings');

      },
        error => {
          this.saveConfiguration.emit(false);
          this.toastr.showErrorMessage('Unable to update the Leave Restriction Settings');
          console.error(error);
        });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      canApplyHalfDay: [false],
      canEmployeeApplyLeave: [false],
      canApplyLeaveDuringProbation: [false],
      canApplyLeaveDuringNoticePeriod: [false],
      canApplyForFutureDate: [false],
      canReportingManagerOverrideRestrictions: [false],
      canReportingManagerAllocateLeaveCredit: [false],
      isLeaveApprovalRequired: [false],
      leaveStructureId: this.leaveStructureId,
      leaveComponentId: this.leaveComponentId,
      createdDate: []
    });
  }
}
