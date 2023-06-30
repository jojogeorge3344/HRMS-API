import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HolidayCategoryService } from '../holiday-category.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-holiday-category-create',
  templateUrl: './holiday-category-create.component.html'
})
export class HolidayCategoryCreateComponent implements OnInit {


  addForm: FormGroup;
  currentUserId: number;
  currentYear;
  years;
  @Input() holiday;
  nameExistCheck: boolean=false;

  constructor(
    private holidayCategoryService: HolidayCategoryService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
      this.currentYear = new Date().getFullYear();
      this.years = Array.from({length: 11}, (x, i) => i + this.currentYear - 5);
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    if(this.nameExistCheck){
      this.toastr.showWarningMessage("Holiday Category Name already Exist")
    }else{
      this.holidayCategoryService.add(this.addForm.value).subscribe((result: any) => {
        if (result.id === -1) {
          this.toastr.showErrorMessage('Holiday category already exists!');
        } else {
          this.toastr.showSuccessMessage('Holiday category added successfully!');
          this.activeModal.close('submit');
        }
      },
        error => {
          console.error(error);
          this.toastr.showErrorMessage('Unable to add the Holiday Category');
        });
    }
   
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]],
      year: [this.currentYear, [
        Validators.required,
      ]],
      isConfigured: [false],
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
