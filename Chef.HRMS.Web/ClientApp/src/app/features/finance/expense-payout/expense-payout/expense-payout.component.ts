import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { getCurrentUserId } from '@shared/utils/utils.functions';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { PaymentAccount } from 'src/app/models/common/types/paymentaccount';
import { ExpensePayoutService } from '../expense-payout.service';
import { mergeMap } from 'rxjs/operators';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-expense-payout',
  templateUrl: './expense-payout.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class ExpensePayoutComponent implements OnInit {

  @Input() expense;
  currentUserId: any;
  payoutForm: FormGroup;
  paymentAccount = PaymentAccount;
  paymentAccountKeys: number[];
  paymentMode = PaymentMode;
  paymentModeKeys: number[];
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private expensePayoutService: ExpensePayoutService,
    private toastr: ToasterDisplayService
  ) {
    this.paymentModeKeys = Object.keys(this.paymentMode).filter(Number).map(Number);
    this.paymentAccountKeys = Object.keys(this.paymentAccount).filter(Number).map(Number);

  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.payoutForm = this.createFormGroup();
    this.payoutForm.patchValue(this.expense);

  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      expenseRequestId: [{ value: null, disabled: true }, [Validators.required]],
      expenseTypeId: [{ value: '', disabled: true }, [Validators.required]],
      expenseTypeName: [{ value: null, disabled: true }, [Validators.required]],
      expenseDate: [{ value: '', disabled: true }, [
        Validators.required,
      ]],
      name: [{ value: '', disabled: true }, [Validators.required]],
      paymentMode: ['', [Validators.required]],
      paymentAccount: ['', [Validators.required]],
      amount: [{ value: null, disabled: true }, [Validators.required]],
      comment: ['', [Validators.maxLength(250)]],
      employeeId: [],
      createdDate: [],
    });

  }
  onSubmit() {
    const payoutForm = this.payoutForm.getRawValue();
    payoutForm.isPaid = true;
    this.expensePayoutService.insert(payoutForm).pipe(
      mergeMap(customer => this.expensePayoutService.updateStatus(payoutForm.expenseRequestId, payoutForm.paymentMode))
    ).subscribe(res => {
      this.toastr.showSuccessMessage('The loan request is updated successfully!');
      this.activeModal.close('submit');
    });

  }
}
