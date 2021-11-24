import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OvertimePolicyService } from '../overtime-policy.service';
import { AttendanceHoursType } from '../../../../../models/common/types/attendancehourstype';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-overtime-policy-create',
  templateUrl: './overtime-policy-create.component.html'
})
export class OvertimePolicyCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  attendanceHoursTypeLabels: string[];

  @Input() attendanceHoursTypes: AttendanceHoursType;
  @Input() attendanceHoursTypeKeys: number;
  @Input() overtimePolicyNames: string[];



  constructor(
    private overtimePolicyService: OvertimePolicyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.attendanceHoursTypeLabels = ['', 'Total hours worked excluding breaks', 'Total hours worked including breaks'];
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.overtimePolicyService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Overtime policy already exists!');
      } else {
        this.toastr.showSuccessMessage('Overtime policy added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the overtime policy ');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
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
      attendanceHoursType: [1, [
        Validators.required
      ]]
    });
  }
}

