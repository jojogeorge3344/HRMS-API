import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';

import { HolidayCategoryService } from '../holiday-category.service';
import { HolidayService } from '../holiday.service';

import { HolidayCategoryCreateComponent } from '../holiday-category-create/holiday-category-create.component';
import { HolidayCategoryEditComponent } from '../holiday-category-edit/holiday-category-edit.component';

import { HolidayCreateComponent } from '../holiday-create/holiday-create.component';
import { HolidayEditComponent } from '../holiday-edit/holiday-edit.component';
import { HolidayCategory } from '../holiday-category.model';
import { Holiday } from '../holiday.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { HolidayViewComponent } from '../holiday-view/holiday-view.component';

@Component({
  selector: 'hrms-holiday-category-list',
  templateUrl: './holiday-category-list.component.html'
})
export class HolidayCategoryListComponent implements OnInit {

  holidayCategories: HolidayCategory[];
  assignedHolidayCategories: number[] = [];
  firstOpen: number;
  holidays: Holiday[];

  constructor(
    private holidayCategoryService: HolidayCategoryService,
    private holidayService: HolidayService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
  }

  ngOnInit(): void {
    this.getHolidayCategories();
    this.getAssignedHolidayCategories();
    }

  getHolidayCategories() {
    this.holidayCategoryService.getAll().subscribe(res => {
      if (res.length) {
        this.getHolidays(res[0].id);
        this.firstOpen = res[0].id;
      }
      this.holidayCategories = res;
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the holiday lists');
    });
  }

  getAssignedHolidayCategories() {
    this.holidayCategoryService.getAllAssignedHolidayCategories().subscribe(res => {
      this.assignedHolidayCategories = res;
    },
    error => {
      console.error(error);
    });
  }

  isDisabled(category) {
    return this.assignedHolidayCategories.includes(category.id);
  }

  getHolidayCategory(holidayCategoryId: number): HolidayCategory {
    return this.holidayCategories.find(v => v.id === holidayCategoryId);
  }

  getHolidays(categoryId) {
    this.holidayService.getAllByCategory(categoryId).subscribe(result => {
      this.holidays = result;
      this.holidays=result.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) 
      console.log(this.holidays);
      

      if (this.holidays.length === 0 && this.getHolidayCategory(categoryId).isConfigured) {
        this.updateConfigured(categoryId, false);
      }

      if (this.holidays.length > 0 && !this.getHolidayCategory(categoryId).isConfigured) {
        this.updateConfigured(categoryId, true);
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the holidays');
      });
  }

  updateConfigured(holidayCategoryId: number, isConfigured: boolean) {
    this.holidayCategoryService.updateHolidayCategory(holidayCategoryId, isConfigured).subscribe((result) => {
      this.getHolidayCategory(holidayCategoryId).isConfigured = isConfigured;
    },
    error => {
      console.error(error);
    });
  }

  openCreateCategory() {
    const modalRef = this.modalService.open(HolidayCategoryCreateComponent,
      { centered: true, backdrop: 'static' });

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getHolidayCategories();
      }
    });
  }

  openEditCategory(category) {
    const modalRef = this.modalService.open(HolidayCategoryEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.category = category;
    modalRef.componentInstance.isDisabled = this.isDisabled(category);

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getHolidayCategories();
      }
    });
  }

  openCreateHoliday(category) {
    const modalRef = this.modalService.open(HolidayCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.holidayCategory = category;
    modalRef.componentInstance.holiday = this.holidays;
    console.log(modalRef.componentInstance.holiday);
    
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getHolidays(category.id);
      }
    });
  }

  openEditHoliday(holiday: Holiday, category) {
    const modalRef = this.modalService.open(HolidayEditComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.holiday = holiday;
    modalRef.componentInstance.year = category.year;
    modalRef.componentInstance.isDisabled = this.isDisabled(category);

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getHolidays(holiday.holidayCategoryId);
      }
    });
  }
  openViewHoliday(holiday: Holiday, category) {
    const modalRef = this.modalService.open(HolidayViewComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.holiday = holiday;
    modalRef.componentInstance.year = category.year;
    modalRef.componentInstance.isDisabled = this.isDisabled(category);

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getHolidays(holiday.holidayCategoryId);
      }
    });
  }

  deleteCategory(category: HolidayCategory) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the holiday category ${category.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.holidayCategoryService.delete(category.id).subscribe(() => {
          this.toastr.showSuccessMessage('The holiday category deleted successfully!');
          this.getHolidayCategories();
        });
      }
    });
  }

  deleteHoliday(holiday: Holiday) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });


    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the holiday ${holiday.name}?`;

    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.holidayService.delete(holiday.id).subscribe(() => {
          this.toastr.showSuccessMessage('The holiday deleted successfully!');
          this.getHolidays(holiday.holidayCategoryId);
        });
      }
    });
  }
}




