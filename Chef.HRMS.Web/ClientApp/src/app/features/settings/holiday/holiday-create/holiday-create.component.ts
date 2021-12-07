import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { HolidayService } from '../holiday.service';
import { HolidayCategory } from '../holiday-category.model';
import { duplicateNameValidator } from '@shared/utils/validators.functions';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

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

  constructor(
    private holidayService: HolidayService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
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

  get name() { return this.addForm.get('name'); }

  onSubmit() {
    this.holidayService.add(this.addForm.value).subscribe((result: any) => {
      if (result.id === -1) {
        this.toastr.showErrorMessage('Holiday already exists!');
      } else {
        this.toastr.showSuccessMessage('Holiday is created successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to add the Holiday');
      });
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
