import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { GenderType } from '../../../../models/common/types/gendertype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeService } from '@features/employee/employee.service';
import { Employee } from '@features/employee/employee.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-employee-basic-details-create',
  templateUrl: './employee-basic-details-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeBasicDetailsCreateComponent implements OnInit {

  addForm: FormGroup;
  minDate;
  maxDate;
  genderTypeKeys: number[];
  genderType = GenderType;
  currentUserId: number;
   emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  employees: Employee[] = [];
  emails: string[];
  @Output() basicDetailsForm = new EventEmitter<boolean>();
  @Input() basicDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToasterDisplayService,
  ) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.basicDetails != null) {
      this.addForm.patchValue(this.basicDetails);
    }
    this.genderTypeKeys = Object.keys(this.genderType).filter(Number).map(Number);
  }
  // onChangeEmail() {
  //   this.getEmployeeDetails();
  // }
  getEmployeeDetails() {
    this.employeeService.getAll().subscribe(result => {
      this.emails = result.map(e => e.email);
      this.addForm.controls.email.setValidators(duplicateNameValidator(this.emails));
      this.addForm.get('email').updateValueAndValidity();
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Details');
      });
  }
  onSubmit() {
    const addBasicDetails = this.addForm.value;
    this.basicDetailsForm.emit(addBasicDetails);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      middleName: ['', [Validators.maxLength(18)]],
      lastName: ['', [
        Validators.maxLength(18),
        Validators.required
      ]],
      displayName: ['', [
        Validators.maxLength(12),
        Validators.required
      ]],
      gender: [null, [
        Validators.required
      ]],
      dateOfBirth: [null,[
        Validators.required]
      ],
      email: ['', [
        Validators.required,
        Validators.pattern(this.emailRegex),
       // emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      ]],
      uid: [null,[
        Validators.required]
      ],
      language: [null,[
        Validators.required]
      ],
      remarks:[null,[
        Validators.required,
        Validators.maxLength(250)]
      ],
      refno:[null,[
        Validators.required,
        Validators.maxLength(25)]
      ],
    });
  }

}

