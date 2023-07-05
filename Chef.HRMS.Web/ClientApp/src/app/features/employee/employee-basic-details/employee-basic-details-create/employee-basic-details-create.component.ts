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
import { ActivatedRoute } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";


@Component({
  selector: 'hrms-employee-basic-details-create',
  templateUrl: './employee-basic-details-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class EmployeeBasicDetailsCreateComponent implements OnInit {

  addForm: FormGroup;
  minDate;
  maxDate;
  genderTypeKeys: number[];
  genderType = GenderType;
  religion:any[]=[];
  currentUserId: number;
  // emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  employees: Employee[] = [];
  emails: string[];
  relName;
  religionInValid:boolean=false;
  isLoading=false;
  @Output() basicDetailsForm = new EventEmitter<boolean>();
  @Input() basicDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private employeeBasicDetailsService:EmployeeBasicDetailsService,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,
  ) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear() - 18,
      month: current.getMonth() + 1,
      day: current.getDate()
    };
  }

  ngOnInit(): void {
    debugger
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    if (this.basicDetails != null) {
      this.addForm.patchValue(this.basicDetails);
    }
    this.route.params.subscribe((params: any) => {
      if(params.empId){
        this.employeeBasicDetailsService.get(params.empId).subscribe(result => {   
          result.dateOfBirth = new Date(result.dateOfBirth);   
          this.addForm.patchValue(result);
        },)
      }
      
    });
    this.genderTypeKeys = Object.keys(this.genderType).filter(Number).map(Number);
    this.getReligion()
  }
  // onChangeEmail() {
  //   this.getEmployeeDetails();
  // }
  getReligion(){
    this.isLoading=true;
    this.employeeBasicDetailsService.getReligion()
   .subscribe((result)=>{
   let temp={id:undefined,name:'test',isLastRow:true}
   // lastrow
     this.religion=[...result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),temp]; 
     this.isLoading=false;
     let relType=result.find((item)=>this.addForm.get('religionId').value==item.id)
     this.relName=relType
   })
  }
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
  selectReligion(args){
      this.addForm.patchValue({
        religionId:args.value.id
      })
  }
  reloadDocTypes(event){
    event.stopPropagation();
    event.preventDefault();
    this.getReligion()
  }
  onSubmit() {
    // this.addForm.markAllAsTouched
    const addBasicDetails = this.addForm.value;
    this.employeeService.getName(addBasicDetails.firstName).subscribe((res)=>{
      if(res){
        this.toastr.showWarningMessage("User Name already exists")
      }else{
        this.employeeBasicDetailsService.add(addBasicDetails).subscribe((result)=>{
          debugger
          addBasicDetails.switchResult=result
          this.basicDetailsForm.emit(addBasicDetails);
          this.toastr.showSuccessMessage('Employee Basic details added successfully!');
        })
      }
    })   
  }
  changeToUpperCase(){
    debugger
    this.addForm.value.languageKnown= this.addForm.value.languageKnown.value.toUpperCase()
  }


  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', [
        Validators.maxLength(60),
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
        // Validators.required,
        Validators.pattern(this.emailRegex),
       // emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      ]],
      fileNumber: ['', [
        // Validators.required,
        // Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
        // Validators.maxLength(30),
      ]],
      religionId: ['', [
        Validators.required,
      ]],
      uidNumber: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12)  
      ]],
      languageKnown: [null, 
        // [
        // Validators.required] 
      ],
      remarks:[null,[
        Validators.maxLength(250)]
      ],
      refNum:[null,[
        // Validators.required,
        // Validators.maxLength(30)
      ]
      ],
    });
  }

}

