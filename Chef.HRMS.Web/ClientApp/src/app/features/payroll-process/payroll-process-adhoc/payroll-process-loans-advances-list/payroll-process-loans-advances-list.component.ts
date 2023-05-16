import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

import { Months } from 'src/app/models/common/types/months';
import { EmployeeLoanView } from '../payroll-process-loans-advances.viewmodel';
import { PayrollDeferPayementComponent } from '../payroll-defer-payement/payroll-defer-payement.component';
import { PayrollLoanAdvancesService } from '@features/payroll-process/payroll-employee-adhoc/payroll-loan-advances.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-loans-advances-list',
  templateUrl: './payroll-process-loans-advances-list.component.html'
})
export class PayrollProcessLoansAdvancesListComponent implements OnInit {

  months = Months;
  month = Months;
  previousMonths = [];
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  noOfCalendarDays: any;
  paygroupId: any;
  id: any;
  payGroupLoans: EmployeeLoanView[] = [];
  fromDate: string;
  toDate: string;
  employeeId: number;
  payrollmonth:any
  payrollyear:any
  payrollcutoff:any

  constructor(
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    private payrollLoanAdvancesService: PayrollLoanAdvancesService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.month = params.date.split('-')[0];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.paygroupId = params.payGroup;
      this.id = params.id;
      this.paygroupId = params.payGroup;
      this.payrollmonth =  params.month
      this.payrollyear =params.year
      this.payrollcutoff = params.cutOffDay
    });
    this.getAllLoanByPayGroupId();
  }

  getAllLoanByPayGroupId() {
    this.payrollLoanAdvancesService.getLoansByProcess(this.paygroupId,this.payrollyear,this.payrollmonth).subscribe(result => {
      this.payGroupLoans = result.filter(loan => loan.balanceAmount !== 0 && loan.remainingTenure !== 0);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the All Adhoc Deduction by PayGroup');
      });
  }

  openDefermentPayment(loanAdvances: EmployeeLoanView) {
    const modalRef = this.modalService.open(PayrollDeferPayementComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.loanAdvances = loanAdvances;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLoanByPayGroupId();
      }
    });
  }

}
