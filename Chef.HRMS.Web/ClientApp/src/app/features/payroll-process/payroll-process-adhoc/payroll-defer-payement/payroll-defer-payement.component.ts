import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';

import { PayrollProcessDeferPaymentService } from '../payroll-process-defer-payment.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { GeneralPeriodType } from 'src/app/models/common/types/generalperiodtype';
import { EmployeeLoanView } from '../payroll-process-loans-advances.viewmodel';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-defer-payement',
  templateUrl: './payroll-defer-payement.component.html'
})
export class PayrollDeferPayementComponent implements OnInit {

  addForm: FormGroup;
  currentUserId: number;
  generalPeriodTypeKeys: number[];
  generalPeriodType = GeneralPeriodType;
  deferPeriods = [...Array(24).keys()].map(n => n + 1);
  @Input() loanAdvances: EmployeeLoanView;

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToasterDisplayService,
    private formBuilder: FormBuilder,
    private payrollProcessDeferPaymentService: PayrollProcessDeferPaymentService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
    this.generalPeriodTypeKeys = Object.keys(this.generalPeriodType).filter(Number).map(Number);
  }

  onSubmit() {
    this.payrollProcessDeferPaymentService.add(this.addForm.value).subscribe(result => {
      this.toastr.showSuccessMessage('Defer Payment Added successfully');
      this.activeModal.close('submit');
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to add Defer Payment');
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: this.currentUserId,
      loanNumber: [this.loanAdvances.loanNumber],
      deferPeriod: [],
      paymentPeriodType: [],
      description: []
    });
  }

}
