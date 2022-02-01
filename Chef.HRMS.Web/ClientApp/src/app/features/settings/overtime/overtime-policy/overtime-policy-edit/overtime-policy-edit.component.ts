import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OvertimePolicyService } from '../overtime-policy.service';
import { AttendanceHoursType } from '../../../../../models/common/types/attendancehourstype';
import { OvertimePolicy } from '../overtime-policy.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-overtime-policy-edit',
  templateUrl: './overtime-policy-edit.component.html'
})
export class OvertimePolicyEditComponent implements OnInit {
  editForm: FormGroup;

  currentUserId: number;
  @Input() attendanceHoursTypes: AttendanceHoursType;
  @Input() attendanceHoursTypeKeys: number;
  @Input() overtimePolicy: OvertimePolicy;
  @Input() isDisabled: boolean;
  @Input() overtimePolicyNames: string[];

  constructor(
    private overtimePolicyService: OvertimePolicyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.overtimePolicy);
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.overtimePolicyService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Overtime policy already exists!');
      } else {
        this.toastr.showSuccessMessage('Overtime policy updated successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to update the overtime policy ');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.overtimePolicyNames)
      ]],
      description: [null, [
        Validators.required,
        Validators.maxLength(128),
      ]],
      attendanceHoursType: [{value: null, disabled: this.isDisabled}, [
        Validators.required
      ]],
      createdDate: [],
      isConfigured:[],
    });
  }
}

