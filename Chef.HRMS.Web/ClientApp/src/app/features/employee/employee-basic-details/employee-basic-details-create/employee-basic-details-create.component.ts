import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { GenderType } from '../../../../models/common/types/gendertype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeService } from '@features/employee/employee.service';
import { Employee } from '@features/employee/employee.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeBasicDetailsService } from '../employee-basic-details.service';
import { result } from 'lodash';


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
  religion:any[]=[];
  currentUserId: number;
   emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  employees: Employee[] = [];
  emails: string[];
  @Output() basicDetailsForm = new EventEmitter<boolean>();
  @Input() basicDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private employeeBasicDetailsService:EmployeeBasicDetailsService,
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

   this.employeeBasicDetailsService.getReligion()
   .subscribe((result)=>{
   this.religion=result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
   })
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
    debugger
    const addBasicDetails = this.addForm.value;
    this.basicDetailsForm.emit(addBasicDetails);
  }
  changeToUpperCase(){
    debugger
    this.addForm.value.languageKnown= this.addForm.value.languageKnown.value.toUpperCase()
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
      fileNumber: ['', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(30),
      ]],
      religionId: ['', [
        Validators.required,
      ]],
      uidNumber: ['', [
        Validators.required,
        Validators.maxLength(30),
      ]],
      languageKnown: [null,[
        Validators.required]
      ],
      remarks:[null,[
        Validators.required,
        Validators.maxLength(250)]
      ],
      refNum:[null,[
        Validators.required,
        Validators.maxLength(30)]
      ],
    });
  }

}

