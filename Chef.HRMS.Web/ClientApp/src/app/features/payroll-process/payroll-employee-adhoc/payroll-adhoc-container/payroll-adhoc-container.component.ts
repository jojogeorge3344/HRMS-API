import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { PayrollProcessService } from '@features/payroll-process/payroll-process.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from '@features/employee/employee.model';
import { PayrollLoanAdvanceListComponent } from '../payroll-loan-advance-list/payroll-loan-advance-list.component';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { PayrollLoanAdvancesService } from '../payroll-loan-advances.service';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-adhoc-container',
  templateUrl: './payroll-adhoc-container.component.html',
  styles: [
  ]
})
export class PayrollAdhocContainerComponent implements OnInit {
  @Input() employee: Employee;
  @Output() selectTab = new EventEmitter<number>();
  @ViewChild('loanList') loanList: PayrollLoanAdvanceListComponent;

  date: any;
  id: number;
  employeeId: number;
  currentUser: any;

  constructor(
    private payrollLoanAdvancesService: PayrollLoanAdvancesService,
    private payrollProcessService: PayrollProcessService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToasterDisplayService,
  ) { }

  ngOnInit(): void {
    this.currentUser = getCurrentUserId();
    this.route.queryParams.subscribe(params => {
      this.date = params.date;
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);
    });
  }
  onSubmit(routeTo) {
    const loans = this.loanList.payGroupLoans.map(loan => {
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
        balanceAmount: loan.balanceAmount,
        createdBy: this.currentUser,
        modifiedBy: this.currentUser
      };
    });
    this.payrollLoanAdvancesService.insert(loans).subscribe(() => {
      this.payrollProcessService.updateProcessedStep(this.id, 4, { id: this.id, stepNumber: 4 })
        .subscribe(() => {
          this.toastr.showSuccessMessage('Payroll Adhoc Deduction Completed');
          if (routeTo === 'continue') {
            this.selectTab.emit(5);
          } else {
            this.router.navigate(['../'], { relativeTo: this.route, queryParamsHandling: 'merge' });
          }
        });
    });

  }

}
