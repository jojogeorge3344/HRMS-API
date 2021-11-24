import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PayrollProcessService } from '../../payroll-process.service';
import { Router, ActivatedRoute } from '@angular/router';

import { PayrollProcessLoansAdvancesListComponent } from '../payroll-process-loans-advances-list/payroll-process-loans-advances-list.component';
import { PayrollLoanAdvancesService } from '@features/payroll-process/payroll-employee-adhoc/payroll-loan-advances.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

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
  @ViewChild('child') child: PayrollProcessLoansAdvancesListComponent;

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
    });
  }
  onSubmit(routeTo) {
    this.currentUser = getCurrentUserId();
    const loans = this.child.payGroupLoans.map(loan => {
      return {
        payrollProcessingMethodId: loan.payrollProcessingMethodId,
        employeeid: loan.employeeid,
        loanId: loan.loanId,
        loanNo: loan.loanNumber,
        loanType: parseInt(loan.loanType, 0),
        loanAmount: loan.amount,
        emiAmount: loan.emiAmount,
        loanSettingId: loan.loanSettingId,
        remainingTenure: loan.remainingTenure,
        balanceAmount: loan.balanceAmount
      };
    });
    this.payrollLoanAdvancesService.insert(loans).subscribe(res => {
        if (res == res || res == 0) {
          this.payrollProcessService.updateProcessedStep(this.id, 4, { id: this.id, stepNumber: 4 })
            .subscribe(res => {
              this.toastr.showSuccessMessage('Payroll Adhoc Deduction Completed');
              if (routeTo === 'continue') {
                this.selectTab.emit(5);
              } else {
                this.router.navigate(['../'], { relativeTo: this.route });
              }
            });
        }
      });
    }

}
