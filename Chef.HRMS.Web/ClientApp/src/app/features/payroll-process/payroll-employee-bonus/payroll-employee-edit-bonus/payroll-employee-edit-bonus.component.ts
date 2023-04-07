import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import { ActivatedRoute } from '@angular/router';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-edit-bonus',
  templateUrl: './payroll-employee-edit-bonus.component.html',
  styleUrls: ['./payroll-employee-edit-bonus.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollEmployeeEditBonusComponent implements OnInit {

  @Input() bonusTypes;
  @Input() PayrollProcessId;
  @Input() employeeId;
  @Input() bonus;
  currentUserId: number;
  date: any;
  months = Months;

  editForm: FormGroup;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };

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
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.editForm.patchValue(this.bonus);
    this.editForm.patchValue({ modifiedBy: this.currentUserId });
  }

  onSubmit() {
    const bonus = this.editForm.value;
    bonus.id = this.bonus.employeeBonusId;
    bonus.employeeId = this.employeeId;
    bonus.payrollProcessingMethodId = this.PayrollProcessId;
    this.bonusService.update(bonus).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Bonus Updated successfully!');
        this.activeModal.close('submit');
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: ['', [
        // Validators.required,Validators.max(0),
      ]],
      bonusTypeId: [null, [
        Validators.required,
      ]],
      amount: [null, [
        Validators.required,
        Validators.min(0),
        Validators.max(999999999)
      ]],
      disburseOn: [new Date(), [
        Validators.required,
      ]],
      remarks: ['', [Validators.maxLength(256)]]
      // createdDate: []
    });
  }

}
