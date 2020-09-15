import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import {  ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-create-bonus',
  templateUrl: './payroll-employee-create-bonus.component.html',
  styleUrls: ['./payroll-employee-create-bonus.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollEmployeeCreateBonusComponent implements OnInit {

  currentUser: number;
  @Input() bonusTypes;
  @Input() PayrollProcessId;
  @Input() employeeId;

  addForm: FormGroup;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  months= Months;
  constructor(
    private bonusService: EmployeeBonusService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,

  ) {
    this.route.queryParams.subscribe(params => {
      const date = params.date.split('-');
      this.minDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.months[date[0]], 10),
        day: 1
      };
      this.maxDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.months[date[0]], 10),
        day: 31
      };

    });
  }

  ngOnInit(): void {
    this.currentUser = getCurrentUserId();
    this.addForm = this.createFormGroup();
  }

  onSubmit() {
    const bonus = this.addForm.value;
    bonus.employeeId = this.employeeId;
    bonus.payrollProcessingMethodId = this.PayrollProcessId,
      console.log(bonus);
    this.bonusService.add(bonus).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Bonus added successfully!');
        this.activeModal.close('submit');
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      // employeeId: ['', [
      //   Validators.required,
      // ]],
      bonusTypeId: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999)
      ]],
      disburseOn: ['', [
        Validators.required,
      ]],
      remarks: ['', [Validators.maxLength(256)]],
      createdBy: [this.currentUser],
      modifiedBy: [this.currentUser]
    });
  }

}
