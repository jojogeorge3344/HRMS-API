import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

import { HolidayService } from '../holiday.service';
import { Holiday } from '../holiday.model';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-holiday-view',
  templateUrl: './holiday-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  styleUrls: ['./holiday-view.component.scss']
})
export class HolidayViewComponent implements OnInit {

  ViewForm: FormGroup;
  currentUserId: number;
  minDate;
  maxDate;

  @Input() holiday: Holiday;
  @Input() year: any;
  @Input() isDisabled: boolean;
  @Input() holidayNames: string[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    ) {
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();

    this.ViewForm = this.createFormGroup();
    this.minDate = {
      year: this.year,
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: this.year,
      month: 12,
      day: 31
    };
  }

  get name() { return this.ViewForm.get('name'); }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [this.holiday.name],
      description: [this.holiday.description],
      date: [{value: new Date(this.holiday.date), disabled: this.isDisabled}],
      isFloating: [{value: this.holiday.isFloating, disabled: this.isDisabled}],
      holidayCategoryId: [this.holiday.holidayCategoryId],
      id: [this.holiday.id],
      createdDate: [this.holiday.createdDate],
     });
  }

}
