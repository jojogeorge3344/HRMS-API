import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { HolidayService } from '../holiday.service';
import { HolidayCategory } from '../holiday-category.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { constant, values } from 'lodash';
import { DatePipe } from '@angular/common';
import { EmployeeLeaveService } from '@features/employee-leave/employee-leave.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-holiday-create',
  templateUrl: './holiday-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class HolidayCreateComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  minDate;
  maxDate;
  

  @Input() holidayCategory: HolidayCategory;
  @Input() holidayNames: string[];
  @Input() holiday:any[];
  holidaydate: any[];
  dateExist: any[];
  myDate: any;
  forDate: any[];
  holidaydata: any;
  alldate: any[];
  nameExistCheck: boolean=false;
  
  constructor(
    private datepipe: DatePipe,
    private holidayService: HolidayService,
    private employeeLeaveService: EmployeeLeaveService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
   this.getAll();
   // console.log(this.holiday);
  
   
   
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.minDate = {
      year: this.holidayCategory.year,
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: this.holidayCategory.year,
      month: 12,
      day: 31
    };
  }
  
  
   userExists(date) {
    return this.holiday.some(function(el) {
      return el.date === date;
    }); 
  }
  onSubmit() {

 
 const date= this.datepipe.transform(this.addForm.get('date').value , 'yyyy-MM-dd');
    
    this.holidaydate = [];
    this.holiday.forEach(element => {
      element.date = this.datepipe.transform(element.date, 'yyyy-MM-dd');
     
    })
    if(this.userExists(date))
    {
      this.toastr.showWarningMessage('Date already exists!');
    }
    else{
      if(this.nameExistCheck){
       this.toastr.showWarningMessage("Holiday name already exists")
      }else{
        this.holidayService.add(this.addForm.value).subscribe((result: any) => {
     
          if (result.id === -1) {
            this.toastr.showErrorMessage('Holiday already exists!');
          } 
       
          else {
            this.toastr.showSuccessMessage('Holiday is created successfully!');
            this.activeModal.close('submit');
          }
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to add the Holiday');
          });
      }
     
    }
    
    console.log("alter list",this.holiday);
    
   
  }
  getAll() {
    this.holidayService.getAll().subscribe(res => {
      this.holidaydata = res;
      this.alldate=[];
      this.holidaydata.filter(y=>{
        this.alldate.push(
          y.date
        )
      })
      console.log("allholiday",this.alldate);
      this.employeeLeaveService.setListDetails(this.alldate)
      
    },
    error => {
      console.error(error);
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        duplicateNameValidator(this.holiday)
      ]],
      description: ['', [Validators.required,Validators.maxLength(128)]],
      date: [null, Validators.required],
      isFloating: [false],
      holidayCategoryId: this.holidayCategory.id,
     });
  }

  checkName(event){
    let check=this.holiday.filter(x=>x.name==event)
      if(check.length){
         this.nameExistCheck=true
      }else{
         this.nameExistCheck=false
    }
    }
}
0
function valDate() {
  throw new Error('Function not implemented.');
}