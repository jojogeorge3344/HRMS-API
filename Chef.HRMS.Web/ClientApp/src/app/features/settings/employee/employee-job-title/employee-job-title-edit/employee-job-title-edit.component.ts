import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeJobTitleService } from './../employee-job-title.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-title-edit',
  templateUrl: './employee-job-title-edit.component.html'
})
export class EmployeeJobTitleEditComponent implements OnInit {


  editForm: FormGroup;

  currentUserId: number;
  @Input() jobId: any;
  @Input() jobTitleNames: string[];

  constructor(
    private employeeJobTitleService: EmployeeJobTitleService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
  this.currentUserId = getCurrentUserId();
  this.editForm = this.createFormGroup();
  this.employeeJobTitleService.get(this.jobId).subscribe(result => {
    this.editForm.patchValue(result);
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
  },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Job Title');
    });
  }

  get name() { return this.editForm.get('name'); }

  onSubmit() {
    this.employeeJobTitleService.update(this.editForm.value).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Job title already exists!');
      } else {
        this.toastr.showSuccessMessage('The Job Title is updated successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('There is an error in updating Job Title');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', [
        Validators.required,
        Validators.maxLength(32),
        Validators.pattern('^([a-zA-Z0-9 ])+$'),
        duplicateNameValidator(this.jobTitleNames)
      ]],
      description: ['', [
        Validators.required,
        Validators.maxLength(128)
      ]],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId]
    });
  }
}
