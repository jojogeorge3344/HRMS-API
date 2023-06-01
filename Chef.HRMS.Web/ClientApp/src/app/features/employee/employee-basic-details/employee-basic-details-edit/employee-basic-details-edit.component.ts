import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeBasicDetailsService } from '../employee-basic-details.service';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderType } from '../../../../models/common/types/gendertype';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeService } from '@features/employee/employee.service';

@Component({
  selector: 'hrms-employee-basic-details-edit',
  templateUrl: './employee-basic-details-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeBasicDetailsEditComponent implements OnInit {
  
  editForm: FormGroup;
  currentUserId: number;
  id: any;
  genderTypeKeys: number[];
  genderType = GenderType;
  religion:any;
  maxDate;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  nameCheck: any;
  userId;

  constructor(
    private employeeBasicDetailsService: EmployeeBasicDetailsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService,
    private router: Router,
    private employeeService: EmployeeService,
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
    this.editForm = this.createFormGroup();
    this.genderTypeKeys = Object.keys(this.genderType).filter(Number).map(Number);

    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });
    this.getBasicDetailsId();
   this.employeeBasicDetailsService.getReligion()
   .subscribe((result)=>{    
   this.religion=result; 
   })
  }

  
  getBasicDetailsId() {
    this.employeeBasicDetailsService.get(this.id).subscribe(result => {  
      this.userId=result.userId
      result.dateOfBirth = new Date(result.dateOfBirth);    
      this.editForm.patchValue(result);

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Basic Details');
      });
  }
  checkCodeName(event){
    this.employeeService.getName(event).subscribe((result)=>{
      if(result){
        this.nameCheck=true
     this.toastr.showWarningMessage("Already Code Exist")
      }else{
        this.nameCheck=false
      }
    })
  }
  onSubmit() {
    var editBasicDetails = this.editForm.value;
    editBasicDetails.uidNumber = parseInt(editBasicDetails.uidNumber)
    if(!this.nameCheck){
    this.employeeBasicDetailsService.update(editBasicDetails).subscribe((result: any) => {
      this.toastr.showSuccessMessage('Employee Basic Details updated successfully!');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Basic Details');
      });
    }
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
      id: [''],
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
      dateOfBirth: ['', [
        Validators.required
      ]],
      email: ['',
       [
        // Validators.required,
        Validators.pattern(this.emailRegex),
      ]
      ],
      fileNumber: ['', 
      // [
      //   Validators.required,
      //   Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$'),
      // ]
    ],
      religionId: ['', [
        Validators.required,
      ]],
      uidNumber: ['', [
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(12)
      ]],
      createdDate: [],
      languageKnown: [null,
        // [
        // Validators.required]
      ],
      remarks:[null,[
        Validators.maxLength(250)]
      ],
      refNum:[null,
        // [
        // Validators.required,
        // Validators.maxLength(30)]
      ],
      userId:[this.userId]
    });
  }

}
