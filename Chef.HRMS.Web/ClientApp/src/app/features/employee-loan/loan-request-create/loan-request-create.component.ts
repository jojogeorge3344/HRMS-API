import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoanRequestService } from '../loan-request.service';
import { LoanSettingsService } from '@settings/loan/loan-settings.service';
import { CompanyService } from '@settings/company/company.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { ToastrService } from 'ngx-toastr';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { Subscription } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  templateUrl: './loan-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]
})
export class LoanRequestCreateComponent implements OnInit, OnDestroy {

  addForm: FormGroup;
  loanTypeKeys: number[];
  paymentTypeKeys: number[];
  todaysDate: Date;
  month: string;
  year: string;
  loanNo: string;
  emiMinDate: string;
  expectedOnUpdated: any;
  currentUserId: number;
  loanSettingId: number;
  minYear:number;
  minMonth:number;
  years: any;
  months: any;
  minDate = undefined;

  @Input() loanTypes: any;
  @Input() paymentTypes: any;
  @Input() companyCode: string;
  @Input() nextLoanNumber: number;
  formSubscription: Subscription;
  controlSubscription: Subscription;

  constructor(
    private loanRequestService: LoanRequestService,
    private loanSettingsService: LoanSettingsService,
    private companyService: CompanyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService) {
   
    this.todaysDate = new Date();
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
    this.getCompanyCode();
    this.addForm = this.createFormGroup();
    this.month = this.todaysDate.toLocaleString('default', { month: 'short' }).toUpperCase();
    this.year = this.todaysDate.toLocaleString('default', { year: '2-digit' });
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);

    this.loanSettingsService.getLoanSettingId().subscribe(result => {
      this.loanSettingId = result;
    });
    this.formSubscription = this.addForm.valueChanges.subscribe(res => {

      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      if (expectedOnYear == res.emiStartsFromYear && res.emiStartsFromMonth && res.emiStartsFromMonth <= expectedOnMonth) {
        this.addForm.get('emiStartsFromMonth').setErrors({ emiMonth: true });
      } else if (res.emiStartsFromMonth) {
        this.addForm.get('emiStartsFromMonth').setErrors(null);

      }
    });
    this.controlSubscription = this.addForm.controls.expectedOn.valueChanges.subscribe(res => {
      // const expectedOnYear = new Date(res.expectedOn).getFullYear();
      // const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      this.years = Array.from({ length: 3 }, (x, i) => i + new Date(res).getFullYear());
      this.addForm.patchValue({ emiStartsFromYear: this.years[0] }, { emitEvent: false });

    });

  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.controlSubscription.unsubscribe();
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
    this.loanNo = 'LN-' + this.companyCode + '-' + this.month + this.year + '/' + this.nextLoanNumber.toString().padStart(4, '0');
  }
 

  onSubmit() {
    const addloanRequestForm = this.addForm.value;  
    addloanRequestForm.loanNo = this.loanNo;
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
      loanAmount: ['', [Validators.required,Validators.max(99999999)]],
      paymentType: [null, [Validators.required]],
      expectedOn: [new Date(Date.now()), [
        Validators.required
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required]],
      employeeID: [this.currentUserId],
      loanSettingId: [this.loanSettingId],
    });
  }
}
