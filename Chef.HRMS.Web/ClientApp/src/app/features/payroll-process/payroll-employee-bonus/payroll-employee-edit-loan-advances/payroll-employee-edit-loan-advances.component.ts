import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { LoanType } from 'src/app/models/common/types/loantype';
import { PaymentType } from 'src/app/models/common/types/paymenttype';
import { LoanRequestService } from '@features/employee-loan/loan-request.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';


@Component({
  selector: 'hrms-payroll-employee-edit-loan-advances',
  templateUrl: './payroll-employee-edit-loan-advances.component.html',
  styleUrls: ['./payroll-employee-edit-loan-advances.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollEmployeeEditLoanAdvancesComponent implements OnInit {
  @Input() employeeList;
  @Input() loanFromList;
  currentUserId: number;
  loan;
  loanSettingId = 1;
  editForm: FormGroup;
  selectedItems: any;
  loanTypes = LoanType;
  paymentTypes = PaymentType;
  loanTypeKeys: number[];
  todaysDate: Date;
  paymentTypeKeys: number[];
  emiMinDate;
  loanNo: string;
  expectedOnUpdated: any;
  years: any;
  monthsEnum = Months;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  months: any;
  constructor(
    public activeModal: NgbActiveModal,
    private loanRequestService: LoanRequestService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService
  ) {
    this.currentUserId = getCurrentUserId();
    this.editForm = this.createFormGroup();
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);
    this.todaysDate = new Date();
    const current = new Date();
    // this.month = this.todaysDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    // this.year = this.todaysDate.toLocaleString('default', { year: '2-digit' });
    const start = current.getFullYear();
    const end = start + 3;
    this.years = Array.from({ length: end - start }, (x, i) => i + start);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.route.queryParams.subscribe(params => {
      const date = params.date.split('-');
      this.minDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.monthsEnum[date[0]], 10),
        day: 1
      };
      this.maxDate = {
        year: parseInt(date[1], 10),
        month: parseInt(this.monthsEnum[date[0]], 10),
        day: 31
      };

    });
  }

  ngOnInit(): void {
    this.loanRequestService.get(this.loanFromList.loanId).subscribe((res: any) => {
      res = {
        ...res,
        employeeId: { id: res.employeeID, firstName: this.loanFromList.name },
        requestedDate: new Date(res.requestedDate),
        expectedOn: new Date(res.expectedOn)
      };
      this.editForm = this.createFormGroup();
      this.loanNo = res.loanNo;
      this.editForm.patchValue(res);
      this.editForm.patchValue({ modifiedBy: this.currentUserId, modifiedDate: new Date() });
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
    });

  }
  formatter = (employee) => employee.firstName;

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: [{ value: '', disabled: true }, [
        Validators.required,
        // Validators.maxLength(64),
        // Validators.pattern('^([a-zA-Z0-9 ])+$')
      ]],
      id: [''],
      loanNo: this.loanNo,
      loanType: [null, [Validators.required]],
      loanAmount: [null, [Validators.required,
      Validators.max(999999999)]],
      paymentType: [{ value: null, disabled: true }, [Validators.required]],
      expectedOn: [new Date(Date.now()), [
        Validators.required,
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required,
      Validators.maxLength(256)]],
      createdBy: [],
      createdDate: [],
      modifiedBy: [this.currentUserId],
      modifiedDate: [new Date()]

    });
  }
  onSubmit() {
    const editloanForm = this.editForm.getRawValue();
    editloanForm.loanNo = this.loanNo;
    editloanForm.employeeId = editloanForm.employeeId.id;
    editloanForm.loanSettingId = this.loanSettingId;
    editloanForm.emiStartsFromMonth = parseInt(this.editForm.value.emiStartsFromMonth, 10);
    editloanForm.emiStartsFromYear = parseInt(this.editForm.value.emiStartsFromYear, 10);
    this.loanRequestService.update(editloanForm).subscribe(result => {
      this.toastr.showSuccessMessage('The loan request is updated successfully!');
      this.activeModal.close('submit');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('There is an error in updating loan request');
      });

  }

}
