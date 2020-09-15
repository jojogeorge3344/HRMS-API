import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { LoanType } from 'src/app/models/common/types/loantype';
import { PaymentType } from 'src/app/models/common/types/paymenttype';
import { LoanRequestService } from '../../../employee-loan/loan-request.service';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { CompanyService } from '@settings/company/company.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Months } from 'src/app/models/common/types/months';
import { ActivatedRoute } from '@angular/router';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-loan-create',
  templateUrl: './payroll-process-loan-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class PayrollProcessLoanCreateComponent implements OnInit {
  @Input() employeeList;
  @Input() nextLoanNumber: number;
  currentUserId: number;
  loanSettingId = 1;
  addForm: FormGroup;
  selectedItems: any;
  loanTypes = LoanType;
  paymentTypes = PaymentType;
  monthsEnum = Months;
  loanTypeKeys: number[];
  paymentTypeKeys: number[];
  todaysDate: Date;
  minDate: { year: number; month: number; day: number; };
  maxDate: { year: number; month: number; day: number; };
  years: number[];
  months: string[];
  loanNo: string;
  companyCode: string;
  month: string;
  year: string;
  expectedOnUpdated: any;
  addloanRequestForm: any;
  selectedEmployee: string;
  selectedEmployeeCode: string;
  searchFailed: boolean;
  constructor(
    private loanService: LoanRequestService,
    private companyService: CompanyService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToasterDisplayService,
    private route: ActivatedRoute,

  ) {

    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);
    const current = new Date();
    this.todaysDate = new Date();
    this.month = this.todaysDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    this.year = this.todaysDate.toLocaleString('default', { year: '2-digit' });
    this.getCompanyCode();
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
    this.currentUserId = getCurrentUserId();
    this.addForm = this.createFormGroup();
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
  selected($event) {
    $event.preventDefault();
    this.selectedEmployee = $event.item.firstName;
    this.selectedEmployeeCode = $event.item.employeeNumber;
    this.addForm.patchValue({
      employeeId: $event.item.id,
      employeeCode: this.selectedEmployeeCode

    });
  }
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
    this.loanNo = 'LN-' + this.companyCode + '-' + this.month + this.year + '/' + this.nextLoanNumber.toString().padStart(4, '0'); ;
  }
  nameFormatter = (employee) => employee.firstName;
  codeFormatter = (employee) => employee.employeeNumber;

  search = (text: Observable<string>) => {
    return text.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => {
        const searchitem = (this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
        if (searchitem.length == 0) {
          this.searchFailed = true;
          return;
        } else {
          this.searchFailed = false;
          return term.length <= 1 ? [].slice() : this.employeeList.filter((v) => v.firstName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
        }

      })
    );
  }
  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      employeeId: ['', [
        Validators.required,
        // Validators.maxLength(64),
        // Validators.pattern('^([a-zA-Z0-9 ])+$')
      ]],
      employeeCode: [{ value: '', disabled: true }],
      loanNo: this.loanNo,
      loanType: [null, [Validators.required]],
      loanAmount: [null, [Validators.required,
      Validators.max(999999999)]],
      paymentType: [{ value: 1, disabled: true }, [Validators.required]],
      expectedOn: [new Date(), [
        Validators.required,
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required,
      Validators.maxLength(256)]],
      createdBy: [this.currentUserId],
      modifiedBy: [this.currentUserId]

    });
  }
  onSubmit() {
    const createLoan = this.addForm.getRawValue();
    createLoan.loanNo = this.loanNo;
    // createLoan.employeeId = createLoan.employeeId.id;
    createLoan.employeeId = createLoan.employeeId;
    createLoan.isapproved = true;
    createLoan.requestedDate = new Date();
    createLoan.loanSettingId = this.loanSettingId;
    createLoan.emiStartsFromMonth = parseInt(this.addForm.value.emiStartsFromMonth, 10);
    createLoan.emiStartsFromYear = parseInt(this.addForm.value.emiStartsFromYear, 10);
    // createLoan.emiStartsFrom = `${createLoan.emiStartsFrom}-01`
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });

    modalRef.componentInstance.confirmationMessage = `Are you sure you want submit the Loan Request ${createLoan.loanNo}?`;
    modalRef.result.then((userResponse) => {
      if (userResponse === true) {
        this.loanService.add(createLoan).subscribe(result => {
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

}
