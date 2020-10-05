import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { HolidayCategoryService } from '../holiday-category.service';
import { HolidayCategory } from '../holiday-category.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-holiday-category-edit',
  templateUrl: './holiday-category-edit.component.html'
})
export class HolidayCategoryEditComponent implements OnInit {

  editForm: FormGroup;
  currentUserId: number;
  currentYear;
  years;

  @Input() category: HolidayCategory;
  @Input() isDisabled: boolean;

  constructor(
    private holidayCategoryService: HolidayCategoryService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService) {
    this.currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (x, i) => i + this.currentYear - 5);
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
  }

  onSubmit() {
    this.holidayCategoryService.update(this.editForm.getRawValue()).subscribe((result: any) => {
      if (result === -1) {
        this.toastr.showErrorMessage('Holiday category already exists!');
      } else {
        this.toastr.showSuccessMessage('Holiday category updated successfully!');
        this.activeModal.close('submit');
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating holiday category');
      });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      id: [this.category.id, Validators.required],
      name: [this.category.name, Validators.required],
      year: [{ value: this.category.year, disabled: this.isDisabled }, [
        Validators.required,
      ]],
      isConfigured: [this.category.isConfigured],
      createdBy: [this.category.createdBy],
      createdDate: [this.category.createdDate],
      modifiedBy: [this.currentUserId]
    });
  }
}
