import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { LoanRequestService } from '@features/employee-loan/loan-request.service';
import { Months } from 'src/app/models/common/types/months';
import { LoanSettingsService } from '@settings/loan/loan-settings.service';
import { CompanyService } from '@settings/company/company.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-employee-create-loan-advances',
  templateUrl: './payroll-employee-create-loan-advances.component.html',
  styleUrls: ['./payroll-employee-create-loan-advances.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollEmployeeCreateLoanAdvancesComponent implements OnInit {

  addForm: FormGroup;
  loanTypeKeys: number[];
  paymentTypeKeys: number[];
  todaysDate: Date;
  month: string;
  year: string;
  loanNo: string;
  emiMinDate: string;
  expectedOnUpdated: any;
  loanSettingId: number;
  years: any;
  months: any;
  monthsEnum = Months;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  currentUserId: number;

  @Input() employeeId;
  @Input() employee;
  @Input() loanTypes: any;
  @Input() paymentTypes: any;
  @Input() companyCode: string;
  @Input() PayrollProcessId;
  @Input() nextLoanNumber: number;
  selectedMonth: string;
  selectedYear: any;

  constructor(
    private loanRequestService: LoanRequestService,
    private loanSettingsService: LoanSettingsService,
    private companyService: CompanyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToasterDisplayService) {
    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    this.todaysDate = new Date();

    const start = current.getFullYear();
    const end = start + 3;
    this.years = Array.from({ length: end - start }, (x, i) => i + start);
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getCompanyCode();
    this.route.queryParams.subscribe(params => {
      const date = params.date.split('-');
      this.selectedMonth = this.monthsEnum[date[0]];
      this.selectedYear = date[1];
    });
    this.addForm = this.createFormGroup();
    this.month = this.todaysDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    this.year = this.todaysDate.toLocaleString('default', { year: '2-digit' });
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);

    this.loanSettingsService.getLoanSettingId().subscribe(result => {
      this.loanSettingId = result;
    });

    this.addForm.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      if (expectedOnYear == res.emiStartsFromYear && res.emiStartsFromMonth && res.emiStartsFromMonth <= expectedOnMonth) {
        this.addForm.get('emiStartsFromMonth').setErrors({ emiMonth: true });
      } else if (res.emiStartsFromMonth) {
        this.addForm.get('emiStartsFromMonth').setErrors(null);
      }
    });
    this.addForm.controls.expectedOn.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      this.years = Array.from({ length: 3 }, (x, i) => i + new Date(res).getFullYear());
      this.addForm.patchValue({ emiStartsFromYear: this.years[0] }, { emitEvent: false });
    });
  }
  formatter = (employee) => employee.fullName;
  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    // map(term => this.employeeList.filter(employee => new RegExp(term, 'mi').test(employee.firstName)).slice(0, 10))
  )
  getCompanyCode() {
    this.companyService.get().subscribe(result => {
      this.companyCode = result.shortName;
      this.setLoanNo();
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Company details');
      });
  }

  setLoanNo() {
    this.loanNo = 'LN-' + this.companyCode + '-' + this.month + this.year + '/' + this.nextLoanNumber.toString().padStart(4, '0');
  }

  updateEmiStartDate(expectedOn) {
    let month;
    if (expectedOn.month < 10) {
      month = `0${expectedOn.month + 1}`;
    } else if (expectedOn.month == 12) {
      month = 1;
      expectedOn.year += 1;
    } else {
      month = expectedOn.month + 1;
    }

    this.expectedOnUpdated = expectedOn;
    this.years = Array.from({ length: (expectedOn.year + 3) - expectedOn.year }, (x, i) => i + expectedOn.year);
    expectedOn.month += 1;
    this.addForm.patchValue({ emiStartsFromYear: this.years });
  }

  checkMonth(year) {
    const month = parseInt(this.addForm.value.emiStartsFromMonth, 10);
    if (month <= this.expectedOnUpdated.month) {
      if (this.expectedOnUpdated.year >= year) {
        this.addForm.get('emiStartsFromMonth').setErrors({ emiMonth: true });
      }
    }
  }

  onSubmit() {
    const addloanRequestForm = this.addForm.getRawValue();
    addloanRequestForm.loanNo = this.loanNo;
    addloanRequestForm.employeeID = addloanRequestForm.employeeID.id;
    addloanRequestForm.loanSettingId = this.loanSettingId;
    addloanRequestForm.isapproved = true;
    addloanRequestForm.requestedDate = new Date();
    addloanRequestForm.emiStartsFromMonth = parseInt(this.addForm.value.emiStartsFromMonth, 10);
    addloanRequestForm.emiStartsFromYear = parseInt(this.addForm.value.emiStartsFromYear, 10);
    // addloanRequestForm.emiStartsFrom = `${addloanRequestForm.emiStartsFrom}-01`

    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want submit the Loan Request ${addloanRequestForm.loanNo}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.loanRequestService.add(addloanRequestForm).subscribe(result => {
          this.toastr.showSuccessMessage('The loan request added successfully!');
          this.activeModal.close('submit');
        },
          error => {
            console.error(error);
            this.toastr.showErrorMessage('Unable to add the loan request');
          });
      }
    });
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      loanNo: this.loanNo,
      loanType: [null, [Validators.required]],
      loanAmount: ['', [Validators.required,
      Validators.max(999999999)]],
      paymentType: [{ value: 1, disabled: true }, [Validators.required]],
      expectedOn: [new Date(this.selectedYear, parseInt(this.selectedMonth, 10) - 1, 25), [
        Validators.required,
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required,
      Validators.maxLength(256)]],
      employeeID: [{ value: this.employee, disabled: true}],
      loanSettingId: [this.loanSettingId]
    });
  }

}
