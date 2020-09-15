import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeLoanView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-loans-advances.viewmodel';
import { PayrollDeferPayementComponent } from '@features/payroll-process/payroll-process-adhoc/payroll-defer-payement/payroll-defer-payement.component';
import { PayrollLoanAdvancesService } from '../payroll-loan-advances.service';

@Component({
  selector: 'hrms-payroll-loan-advance-list',
  templateUrl: './payroll-loan-advance-list.component.html',
  styles: [
  ]
})
export class PayrollLoanAdvanceListComponent implements OnInit {
  employeeId: any;
  @Input() employee;
  id: any;
  payGroupLoans: EmployeeLoanView[] = [];

  constructor(
    private toastr: ToastrService,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private payrollLoanAdvancesService: PayrollLoanAdvancesService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = params.employee;
      this.id = params.id;
    });
    this.getAllLoanByPayGroupId();
  }
  getAllLoanByPayGroupId() {
    this.payrollLoanAdvancesService.getAllLoans(this.employeeId, this.id).subscribe(result => {
      this.payGroupLoans = result.filter(loan => loan.balanceAmount > 0 && loan.remainingTenure > 0);
    });
  }

  openDefermentPayment(loanAdvances: EmployeeLoanView) {
    const modalRef = this.modalService.open(PayrollDeferPayementComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.loanAdvances = loanAdvances;
    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getAllLoanByPayGroupId();
      }
    });
  }

}
