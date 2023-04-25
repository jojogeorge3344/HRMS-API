import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeJobTitleService } from './../employee-job-title.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-job-title-view',
  templateUrl: './employee-job-title-view.component.html',
  styleUrls: ['./employee-job-title-view.component.scss']
})
export class EmployeeJobTitleViewComponent implements OnInit {

  viewForm: FormGroup;

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
  this.viewForm= this.createFormGroup();
  this.employeeJobTitleService.get(this.jobId).subscribe(result => {
    this.viewForm.patchValue(result);
  },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Job Title');
    });
  }

  get name() { return this.viewForm.get('name'); }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: [''],
      description: [''],
      createdDate: []
    });
  }

}
