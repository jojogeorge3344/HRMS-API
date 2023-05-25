import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PayrollProcessService } from '../../payroll-process.service';
import { Router, ActivatedRoute } from '@angular/router';

import { PayrollProcessLoansAdvancesListComponent } from '../payroll-process-loans-advances-list/payroll-process-loans-advances-list.component';
import { PayrollLoanAdvancesService } from '@features/payroll-process/payroll-employee-adhoc/payroll-loan-advances.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessAdhocListComponent } from '../payroll-process-adhoc-list/payroll-process-adhoc-list.component';
import { resolve } from 'dns';

@Component({
  selector: 'hrms-payroll-process-adhoc-container',
  templateUrl: './payroll-process-adhoc-container.component.html',
})
export class PayrollProcessAdhocContainerComponent implements OnInit {
  currentUser: number;
  @Output() selectTab = new EventEmitter<number>();
  date: any;
  paygroupId: number;
  id: number;
  loandetails:any=[]
  adhocdeductiondetails:any=[]
  @ViewChild('child') child: PayrollProcessLoansAdvancesListComponent;
  @ViewChild('adhoc') adhoc: PayrollProcessAdhocListComponent
  payrollProcessId:any

  constructor(
    private payrollProcessService: PayrollProcessService,
    private payrollLoanAdvancesService: PayrollLoanAdvancesService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.date = params.date;
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
      this.payrollProcessId = params.processId
    });
    this.currentUser = getCurrentUserId();
    
  }
  // onSubmit(routeTo) {

  //  var data = this.adhoc.payGroupProcessAdhocDeduction
  //   this.currentUser = getCurrentUserId();
  //   const loans = this.child.payGroupLoans.map(loan => {
  //     return {
  //       payrollProcessingMethodId: loan.payrollProcessingMethodId,
  //       employeeid: loan.employeeid,
  //       loanId: loan.loanId,
  //       loanNo: loan.loanNumber,
  //       loanType: parseInt(loan.loanType, 0),
  //       loanAmount: loan.amount,
  //       emiAmount: loan.emiAmount,
  //       loanSettingId: loan.loanSettingId,
  //       remainingTenure: loan.remainingTenure,
  //       balanceAmount: loan.balanceAmount
  //     };
  //   });
  //   this.payrollLoanAdvancesService.insert(loans).subscribe(res => {
  //       if (res == res || res == 0) {
  //         this.payrollProcessService.updateProcessedStep(this.id, 4, { id: this.id, stepNumber: 4 })
  //           .subscribe(res => {
  //             this.toastr.showSuccessMessage('Payroll Adhoc Deduction Completed');
  //             if (routeTo === 'continue') {
  //               this.selectTab.emit(5);
  //             } else {
  //               this.router.navigate(['../'], { relativeTo: this.route });
  //             }
  //           });
  //       }
  //     });
  //   }


  saveAdhocloanDetails(){

   for(let i=0;i<this.loandetails.length;i++){
    this.loandetails[i].createdDate = new Date()
    this.loandetails[i].modifiedDate = new Date()
    this.loandetails[i].createdBy =this.currentUser
    this.loandetails[i].modifiedBy = this.currentUser
    this.loandetails[i].payrollProcessId = parseInt(this.payrollProcessId)
    this.loandetails[i].processStatus = 0
    this.loandetails[i].payrollProcessDate = new Date()
    this.loandetails[i].loanDetailsId = this.loandetails[i].loanId
    this.loandetails[i].loanAmount = this.loandetails[i].amount
   }
   this.payrollLoanAdvancesService.saveAdhocLoan(this.loandetails).subscribe(res => {
        if (res) {
          this.toastr.showSuccessMessage('Payroll Loan Details Completed');
          this.selectTab.emit(3);
        }
      },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to insert Loan Details.');
        this.selectTab.emit(2);
        return
      });
  }


  saveAdhocDeductionDetails(){
    
    for(let i=0;i<this.adhocdeductiondetails.length;i++){
       this.adhocdeductiondetails[i].createdDate = new Date
       this.adhocdeductiondetails[i].modifiedDate = new Date
       this.adhocdeductiondetails[i].createdBy = this.currentUser
       this.adhocdeductiondetails[i].modifiedBy = this.currentUser
       this.adhocdeductiondetails[i].payrollProcessDate = new Date
       this.adhocdeductiondetails[i].payrollProcessId = parseInt(this.payrollProcessId)
       this.adhocdeductiondetails[i].deductionId = this.adhocdeductiondetails[i].adhocDeductionId
       this.adhocdeductiondetails[i].processStatus = 0
       this.adhocdeductiondetails[i].adhocAmount = this.adhocdeductiondetails[i].amount
    }
    this.payrollLoanAdvancesService.saveAdhocdeduction(this.adhocdeductiondetails).subscribe(res => {
      if (res) {
        this.toastr.showSuccessMessage('Payroll Adhoc  Details Completed');
        this.selectTab.emit(3);
      }
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to insert Adhoc Details.');
      this.selectTab.emit(2);
      return
    });
  }


  

  onSubmit(type) {
    this.loandetails = this.child.payGroupLoans
    this.adhocdeductiondetails = this.adhoc.payGroupProcessAdhocDeduction

   
    if(this.adhocdeductiondetails.length > 0){
     this.saveAdhocDeductionDetails()
    }
    if(this.loandetails.length > 0){
      this.saveAdhocloanDetails()
     }
    
  }
}
