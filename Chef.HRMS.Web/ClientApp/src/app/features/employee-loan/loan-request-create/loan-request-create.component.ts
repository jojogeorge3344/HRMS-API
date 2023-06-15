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
import * as moment from 'moment';
import { RequestStatus } from 'src/app/models/common/types/requeststatustype';
import { EmployeeService } from '@features/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './loan-request-create.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
  styleUrls: ['./loan-request-create.component.scss'],
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
  minYear: number;
  minMonth: number;
  years: any;
  months: any;
  minDate = undefined;
  scheduleArray: any = []
  showLoanSchedules: boolean = false
  @Input() loanTypes: any;
  @Input() paymentTypes: any;
  @Input() companyCode: string;
  @Input() nextLoanNumber: number;
  formSubscription: Subscription;
  controlSubscription: Subscription;
  requestTypes = RequestStatus;
  config;
  employeeList;
  empObj;
  disableRequestedBy=false
  isLoading=false;
  constructor(
    private loanRequestService: LoanRequestService,
    private loanSettingsService: LoanSettingsService,
    private companyService: CompanyService,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
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

    console.log("ActivatedRoute", this.router.url)
    debugger
    this.currentUserId = getCurrentUserId();
    this.getCompanyCode();
    this.getEmployeeList()
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
      if (typeof res == "object") {
        const expectedOnYear = new Date(res.expectedOn).getFullYear();
        const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
        this.years = Array.from({ length: 3 }, (x, i) => i + new Date(res).getFullYear());
       // this.addForm.patchValue({ emiStartsFromYear: this.years[0] }, { emitEvent: false });
      }
    });
  }
  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.controlSubscription.unsubscribe();
  }
  getEmployeeList() {
    this.isLoading=true
    this.employeeService.getAll()
      .subscribe((result) => {
        let temp = { id: undefined, firstName: 'test', isLastRow: true }
      // lastrow
      this.employeeList = [...result, temp];
      this.isLoading=false;
        if(this.router.url=='/my-loan'){
          this.addForm.patchValue({ requestedBy: this.currentUserId });
          this.empObj=this.employeeList.find((item) => item.id == this.currentUserId)
          this.disableRequestedBy=true
        }
      })
  }

  getCompanyCode() {
    this.companyService.get().subscribe(result => {
      this.companyCode = result.shortName;
      this.setLoanNo();
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Fetch the Company Details');
      });
  }

  setLoanNo() {
    this.loanNo = 'LN-' + this.companyCode + '-' + this.month + this.year + '/' + this.nextLoanNumber.toString().padStart(4, '0');
  }



  onSubmit() {
    if (this.addForm.invalid) {
      return
    }
    const addloanRequestForm = this.addForm.value;
    if(this.router.url=='/my-loan'){
      addloanRequestForm.requestedBy = this.currentUserId;
    }else{
      addloanRequestForm.requestedBy = addloanRequestForm.requestedBy
    }
    addloanRequestForm.loanNo = this.loanNo;
    addloanRequestForm.loanSettingId = this.loanSettingId;
    
    //addloanRequestForm.isapproved = this.requestTypes.Approved;
    addloanRequestForm.status =this.requestTypes.Approved;;
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
  draftSave() {
    if (this.addForm.invalid) {
      return
    }
    const addloanRequestForm = this.addForm.value;
    if(this.router.url=='/my-loan'){
      addloanRequestForm.requestedBy = this.currentUserId;
    }else{
      addloanRequestForm.requestedBy = addloanRequestForm.requestedBy;
    }
    addloanRequestForm.loanNo = this.loanNo;
    addloanRequestForm.loanSettingId = this.loanSettingId;
    //addloanRequestForm.isapproved = this.requestTypes.Draft;
    addloanRequestForm.status =this.requestTypes.Draft;
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
  validateNumber(ev) {
    const keyCode = ev.keyCode;
    const excludedKeys = [8, 110, 190];
    if (
      !(
        (keyCode >= 48 && keyCode <= 57) ||
        (keyCode >= 96 && keyCode <= 105) ||
        excludedKeys.includes(keyCode)
      )
    ) {
      ev.preventDefault();
    }
  }

  generateSchedule() {
    this.scheduleArray = []
    let totalperiod = this.addForm.value.repaymentTerm
    let amountperMonth
    amountperMonth = this.addForm.value.loanAmount / totalperiod
    amountperMonth = parseInt(amountperMonth)
    amountperMonth = parseFloat(amountperMonth).toFixed(0)

    var startingMonth = parseInt(this.addForm.value.emiStartsFromMonth)
    var startYear = this.addForm.value.emiStartsFromYear
    var startDate = new Date(startYear, startingMonth - 1);

    for (var i = 1; i <= totalperiod; i++) {
      if (i == 1) {
        var month = startDate.getMonth() + 1
        var year = startDate.getFullYear()
        this.scheduleArray.push({ Year: year, Month: this.months[month - 1], Amount: amountperMonth, Status: 'Pending' })
      } else {
        var startingMonth = parseInt(this.addForm.value.emiStartsFromMonth)
        var startYear = this.addForm.value.emiStartsFromYear
        var startDate = new Date(startYear, startingMonth - 1);
        var upComingDate = new Date(startDate.setMonth(startDate.getMonth() + i - 1));
        month = upComingDate.getMonth() + 1
        year = upComingDate.getFullYear()
        this.scheduleArray.push({ Year: year, Month: this.months[month - 1], Amount: amountperMonth, Status: 'Pending' })
      }

    }
    this.showLoanSchedules = true
  }

  selectRequestedBy(args){
    if(args.value && args.value.id){
      this.addForm.patchValue({
        requestedBy:args.value.id,
        })
    }else{
      this.addForm.patchValue({
        requestedBy: null,
      })  
    }
  }
  refreshRequestedBy(event){
    event.stopPropagation();
    event.preventDefault();
    this.getEmployeeList();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      loanNo: this.loanNo,
      loanType: [null, [Validators.required]],
      loanAmount: ['', [Validators.required, Validators.max(99999999)]],
      paymentType: [null, [Validators.required]],
      expectedOn: [new Date(Date.now()), [
        Validators.required
      ]],
      emiStartsFromYear: [null, [Validators.required]],
      emiStartsFromMonth: [null, [Validators.required]],
      repaymentTerm: ['', [Validators.max(36), Validators.required]],
      comments: ['', [Validators.required, Validators.maxLength(200)]],
      employeeID: [this.currentUserId],
      loanSettingId: [this.loanSettingId],
      extendedmonth: [0],
      requestedBy: [null,[Validators.required]]
    });
  }
}
