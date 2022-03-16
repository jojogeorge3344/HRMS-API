import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoanRequestService } from '../loan-request.service';
import { LoanSettingsService } from '@settings/loan/loan-settings.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { LoanRequest } from '../loan-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './loan-request-edit.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class LoanRequestEditComponent implements OnInit {


  editForm: FormGroup;
  emiMinDate;
  loanTypeKeys: number[];
  paymentTypeKeys: number[];
  loanNo: string;
  expectedOnUpdated: any;
  years: any;
  months: any;
  currentUserId: number;
  loanSettingId: number;
  minDate = undefined;

  @Input() loanTypes: any;
  @Input() paymentTypes: any;
  @Input() loanId: any;
  @Input() loanRequest: LoanRequest;

  constructor(
    private loanRequestService: LoanRequestService,
    private loanSettingsService: LoanSettingsService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    const start = current.getFullYear();
    const end = start + 3;
    this.years = Array.from({ length: end - start }, (x, i) => i + start);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);

    this.loanRequestService.get(this.loanId).subscribe(result => {
      result.requestedDate = new Date(result.requestedDate);
      result.expectedOn = new Date(result.expectedOn);
      this.loanNo = result.loanNo;
      this.editForm.patchValue(result);

    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the loan request');
      });

    this.loanSettingsService.getLoanSettingId().subscribe(result => {
      this.loanSettingId = result;
    });
    this.editForm.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      if (expectedOnYear == res.emiStartsFromYear && res.emiStartsFromMonth && res.emiStartsFromMonth <= expectedOnMonth) {
        this.editForm.get('emiStartsFromMonth').setErrors({ emiMonth: true });
      } else if (res.emiStartsFromMonth) {
        this.editForm.get('emiStartsFromMonth').setErrors(null);
      }
    });
    this.editForm.controls.expectedOn.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      this.years = Array.from({ length: 3 }, (x, i) => i + new Date(res).getFullYear());
      this.editForm.patchValue({ emiStartsFromYear: this.years[0] }, { emitEvent: false });
    });
  }

  onSubmit() {
    const editloanRequestForm = this.editForm.value;
    editloanRequestForm.loanNo = this.loanNo;
    editloanRequestForm.loanSettingId = this.loanSettingId;
    editloanRequestForm.id = this.loanId;
    editloanRequestForm.emiStartsFromMonth = parseInt(this.editForm.value.emiStartsFromMonth, 10);
    editloanRequestForm.emiStartsFromYear = parseInt(this.editForm.value.emiStartsFromYear, 10);
    this.loanRequestService.update(editloanRequestForm).subscribe(result => {
      this.toastr.showSuccessMessage('The loan request is updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating loan request');
      });
  }

  validateNumber(ev) {
    const keyCode = ev.keyCode;
    const excludedKeys = [8, 110, 190];
    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ){
      ev.preventDefault();
    }
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      loanNo: this.loanNo,
      loanType: [null, [Validators.required]],
      loanAmount: ['', [Validators.required,Validators.max(2000000)]],
      paymentType: [null, [Validators.required]],
      expectedOn: [new Date(Date.now()), [
        Validators.required,
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required,Validators.maxLength(200)]],
      employeeID: [this.currentUserId],
      loanSettingId: [this.loanSettingId],

      createdDate: [],

    });
  }
}
