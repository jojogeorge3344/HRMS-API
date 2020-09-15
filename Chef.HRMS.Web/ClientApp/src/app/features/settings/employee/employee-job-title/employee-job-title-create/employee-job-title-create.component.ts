import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeJobTitleService } from '../employee-job-title.service';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
    selector: 'hrms-employee-job-title-create',
    templateUrl: './employee-job-title-create.component.html'
  })
  export class EmployeeJobTitleCreateComponent implements OnInit {


    addForm: FormGroup;

    currentUserId: number;
    @Input() jobTitleNames: string[];

    constructor(
      private employeeJobTitleService: EmployeeJobTitleService,
      public activeModal: NgbActiveModal,
      private formBuilder: FormBuilder,
      private toastr: ToasterDisplayService) {
   }

   ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    // this.addJobTitleForm.patchValue({companyId: this.id});
  }

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.employeeJobTitleService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Job Title already exists!');
      } else {
        this.toastr.showSuccessMessage('Job Title added successfully!');
        this.activeModal.close('submit');
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add the Job Title');
    });

  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
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
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]
    });
  }

  }
