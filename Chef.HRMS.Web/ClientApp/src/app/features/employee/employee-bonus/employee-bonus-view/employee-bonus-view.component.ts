import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'hrms-employee-bonus-view',
  templateUrl: './employee-bonus-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class EmployeeBonusViewComponent implements OnInit {

  viewForm: FormGroup;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  @Input() bonusTypes;
  @Input() employeeId;
  @Input() bonus;
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    const date = new Date();
    this.minDate = {
      year: date.getFullYear(),
      month: 1,
      day: 1
    };
    this.maxDate = {
      year: date.getFullYear() + 10,
      month: 12,
      day: 31
    };
  }
  ngOnInit(): void {
    this.viewForm = this.createFormGroup();
    const bonusValue = this.bonus;
    bonusValue.disburseOn = new Date(bonusValue.disburseOn);
    this.viewForm.patchValue(bonusValue);
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [parseInt(this.employeeId, 10)],
      bonusTypeId: [{ value: null, disabled: true }],
      amount: [{ value: null, disabled: true }],
      disburseOn: [{ value: new Date(Date.now()), disabled: true }],
      remarks: [{ value: '', disabled: true }],

    });
  }

}
