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

@Component({
  selector: 'hrms-holiday-create',
  templateUrl: './holiday-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
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
  
  constructor(
    private datepipe: DatePipe,
    private holidayService: HolidayService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
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
      this.toastr.showErrorMessage('Date already exists!');
    }
    else{
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
    
    console.log("alter list",this.holiday);
    
   
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [
        Validators.required,
        duplicateNameValidator(this.holidayNames)
      ]],
      description: ['', Validators.required],
      date: [null, Validators.required],
      isFloating: [false],
      holidayCategoryId: this.holidayCategory.id,
     });
  }
}
0
function valDate() {
  throw new Error('Function not implemented.');
}