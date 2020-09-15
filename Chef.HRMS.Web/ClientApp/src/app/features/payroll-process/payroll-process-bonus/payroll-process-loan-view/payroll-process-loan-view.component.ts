import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoanType } from 'src/app/models/common/types/loantype';
import { PaymentType } from 'src/app/models/common/types/paymenttype';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoanRequestService } from '../../../employee-loan/loan-request.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'hrms-payroll-process-loan-view',
  templateUrl: './payroll-process-loan-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollProcessLoanViewComponent implements OnInit {
  @Input() employeeList;
  @Input() loanFromList;
  loan;
  loanSettingId = 1;
  editLoanForm: FormGroup;
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
  months: any;
  constructor(
    public activeModal: NgbActiveModal,
    private loanRequestService: LoanRequestService,
    private formBuilder: FormBuilder,
  ) {
    this.editLoanForm = this.createFormGroup();
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);
    this.todaysDate = new Date();
    const current = new Date();
    const start = current.getFullYear();
    const end = start + 3;
    this.years = Array.from({ length: end - start }, (x, i) => i + start);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  ngOnInit(): void {
    this.loanRequestService.get(this.loanFromList.loanId).subscribe((res: any) => {
      console.log(res)
      res = {
        ...res,
        employeeId: { id: res.employeeID, firstName: this.loanFromList.name },
        requestedDate: new Date(res.requestedDate),
        expectedOn: new Date(res.expectedOn)
      };
      this.editLoanForm = this.createFormGroup();
      this.loanNo = res.loanNo;
      this.editLoanForm.patchValue(res);
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
      ]],
      id: [''],
      loanNo: this.loanNo,
      loanType: [{ value: '', disabled: true }, [Validators.required]],
      loanAmount: [{ value: '', disabled: true }, [Validators.required]],
      paymentType: [{ value: null, disabled: true }, [Validators.required]],
      expectedOn: [{ value: new Date(), disabled: true }, [
        Validators.required,
      ]],
      emiStartsFromYear: [{ value: null, disabled: true }, [Validators.required]],
      emiStartsFromMonth: [{ value: null, disabled: true }, [Validators.required]],
      repaymentTerm: [{ value: '', disabled: true }, [Validators.max(36), Validators.required]],
      comments: [{ value: '', disabled: true }, [Validators.required]],

    });
  }

}
