import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateNativeAdapter, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentAccount } from 'src/app/models/common/types/paymentaccount';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-expense-payout-view',
  templateUrl: './expense-payout-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class ExpensePayoutViewComponent implements OnInit {
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
      paymentMode: [{ value: '', disabled: true }, [Validators.required]],
      paymentAccount: [{ value: '', disabled: true }, [Validators.required]],
      amount: [{ value: null, disabled: true }, [Validators.required]],
      comment: [{ value: null, disabled: true }, [Validators.maxLength(250)]],
    });

  }

}
