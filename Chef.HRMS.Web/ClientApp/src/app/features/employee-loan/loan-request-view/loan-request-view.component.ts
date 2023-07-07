import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { LoanRequestService } from '../loan-request.service';
import { LoanSettingsService } from '@settings/loan/loan-settings.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { LoanRequest } from '../loan-request.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { EmployeeService } from '@features/employee/employee.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  templateUrl: './loan-request-view.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class LoanRequestViewComponent implements OnInit {

  viewForm: FormGroup;
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
  config;
  employeeList;
  requestedBy;
  @Input() loanTypes: any;
  @Input() paymentTypes: any;
  @Input() loanId: any;
  @Input() loanRequest: LoanRequest;
  scheduleArray:any=[]

  constructor(
    private employeeService: EmployeeService,
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
    this.viewForm = this.createFormGroup();
    this.loanTypeKeys = Object.keys(this.loanTypes).filter(Number).map(Number);
    this.paymentTypeKeys = Object.keys(this.paymentTypes).filter(Number).map(Number);
    this.config = {
      displayKey: "firstName",
      search: true,
      limitTo: 0,
      placeholder: "Select Employee",
      noResultsFound: "No results found!",
      searchPlaceholder: "Search",
      searchOnKey: "firstName",
      clearOnSelection: false,
    };
    this.loanRequestService.get(this.loanId).subscribe(result => {
      result.requestedDate = new Date(result.requestedDate);
      result.expectedOn = new Date(result.expectedOn);
      this.loanNo = result.loanNo;
     
      this.viewForm.patchValue(result);
      if(this.viewForm.controls.loanType.value === 2){debugger
        //this.generateSchedule()
        this.scheduleArray = result.loanRequestDeatails

      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the loan request');
      });

    this.loanSettingsService.getLoanSettingId().subscribe(result => {
      this.loanSettingId = result;
    });
    this.viewForm.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      if (expectedOnYear == res.emiStartsFromYear && res.emiStartsFromMonth && res.emiStartsFromMonth <= expectedOnMonth) {
        this.viewForm.get('emiStartsFromMonth').setErrors({ emiMonth: true });
      } else if (res.emiStartsFromMonth) {
        this.viewForm.get('emiStartsFromMonth').setErrors(null);
      }
    });
    this.viewForm.controls.expectedOn.valueChanges.subscribe(res => {
      const expectedOnYear = new Date(res.expectedOn).getFullYear();
      const expectedOnMonth = new Date(res.expectedOn).getMonth() + 1;
      this.years = Array.from({ length: 3 }, (x, i) => i + new Date(res).getFullYear());
      this.viewForm.patchValue({ emiStartsFromYear: this.years[0] }, { emitEvent: false });
    });
    this.getEmpDetails()
  }
  selectionChanged(args) {
    // this.viewForm.get("requestedBy").patchValue(args.value.id);
  }
  getEmployeeList() {
    this.employeeService.getAll()
      .subscribe((result) => {
        this.employeeList = result
        let details: any = null;
        
        details = this.employeeList.find((item) => item.id == this.requestedBy)
        //this.viewForm.patchValue({ requestedBy: null });
        this.viewForm.get('requestedBy').updateValueAndValidity()
        this.viewForm.patchValue({ requestedBy: details.firstName });
        this.viewForm.get('requestedBy').updateValueAndValidity()
        // this.employeeList.forEach((emp) =>{
        //   if((this.requestedBy ==emp.id)){
        //      details=emp.firstName;
        //      this.editForm.patchValue({employeeId:details});
        //   }
        //  });
       
        
      }
      )


  }
  getEmpDetails(){
    this.loanRequestService.get(this.loanId).subscribe(result => {
      this.requestedBy = result.requestedBy
      this.getEmployeeList()
    }
    );
  }

  onSubmit() {
    const editloanRequestForm = this.viewForm.value;
    editloanRequestForm.loanNo = this.loanNo;
    editloanRequestForm.loanSettingId = this.loanSettingId;
    editloanRequestForm.id = this.loanId;
    editloanRequestForm.emiStartsFromMonth = parseInt(this.viewForm.value.emiStartsFromMonth, 10);
    editloanRequestForm.emiStartsFromYear = parseInt(this.viewForm.value.emiStartsFromYear, 10);
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
    ) {
      ev.preventDefault();
    }
  }


  generateSchedule(){debugger

    this.scheduleArray = this.viewForm.controls.loanRequestDeatails.value
    // this.scheduleArray = []


    // let totalperiod = this.viewForm.value.repaymentTerm
    // let amountperMonth
    // amountperMonth = this.viewForm.value.loanAmount / totalperiod
    // amountperMonth = parseInt(amountperMonth)
    // amountperMonth = parseFloat(amountperMonth)
    // amountperMonth = Math.round(amountperMonth)



    // var startingMonth = parseInt(this.viewForm.value.emiStartsFromMonth)
    // var startYear = this.viewForm.value.emiStartsFromYear
    // var startDate = new Date(startYear, startingMonth - 1);




    // for (var i = 1; i <= totalperiod; i++) {
    //   if (i == 1) {
    //     var month = startDate.getMonth() + 1
    //     var year = startDate.getFullYear()
    //     this.scheduleArray.push({ Year: year, Month: this.months[month - 1], Amount: amountperMonth, Status: 'Pending' })
    //   } else {
    //     var startingMonth = parseInt(this.viewForm.value.emiStartsFromMonth)
    //     var startYear = this.viewForm.value.emiStartsFromYear
    //     var startDate = new Date(startYear, startingMonth - 1);
    //     var upComingDate = new Date(startDate.setMonth(startDate.getMonth() + i - 1));
    //     month = upComingDate.getMonth() + 1
    //     year = upComingDate.getFullYear()
    //     this.scheduleArray.push({ Year: year, Month: this.months[month - 1], Amount: amountperMonth, Status: 'Pending' })
    //   }
      
    // }
}

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      loanNo: this.loanNo,
      loanType: [null],
      loanAmount: [''],
      paymentType: [null],
      expectedOn: [new Date(Date.now()), [
      ]],
      emiStartsFromYear: [null],
      emiStartsFromMonth: [null],
      repaymentTerm: [''],
      comments: [''],
      employeeID: [this.currentUserId],
      requestedBy: [null],
      loanSettingId: [this.loanSettingId],

      createdDate: [],
      extendedMonth: [0]

    });
  }

}
