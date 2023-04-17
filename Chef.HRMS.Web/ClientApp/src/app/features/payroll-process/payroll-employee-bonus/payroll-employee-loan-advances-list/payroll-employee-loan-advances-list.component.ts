import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  ActivatedRoute } from '@angular/router';

import { PayrollEmployeeCreateLoanAdvancesComponent } from '../payroll-employee-create-loan-advances/payroll-employee-create-loan-advances.component';
import { PayrollEmployeeEditLoanAdvancesComponent } from '../payroll-employee-edit-loan-advances/payroll-employee-edit-loan-advances.component';
import { PayrollEmployeeViewLoanAdvancesComponent } from '../payroll-employee-view-loan-advances/payroll-employee-view-loan-advances.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { EmployeeLoanView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-loans-advances.viewmodel';
import { LoanRequestService } from '@features/employee-loan/loan-request.service';
import { PaymentType } from 'src/app/models/common/types/paymenttype';
import { LoanType } from 'src/app/models/common/types/loantype';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { PayrollProcessService } from '@features/payroll-process/payroll-process.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'hrms-payroll-employee-loan-advances-list',
  templateUrl: './payroll-employee-loan-advances-list.component.html',
  styleUrls: ['./payroll-employee-loan-advances-list.component.scss']
})
export class PayrollEmployeeLoanAdvancesListComponent implements OnInit {
  @Input() employee;
  employeeId: number;
  id: number;
  payrollEmployeeLoans: EmployeeLoanView[] = [];
  loanTypes = LoanType;
  paymentTypes = PaymentType;
  nextLoanNumber: number;
  employeeSub: Subscription;
  methodId: number;

  constructor(
    private loanRequestService: LoanRequestService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private route: ActivatedRoute,
    public payrollprocessSrv: PayrollProcessService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);
    });
    this.getLoanNumberbyId();
    this.employeeSub = this.payrollprocessSrv.getEmployeeDetailsSubject().subscribe(resp => {
  
      this.methodId = +resp[0].id
      this.getAllLoanAdvanceByEmployeeId();
    })
  }

  getLoanNumberbyId() {
    this.loanRequestService.getLoanId().subscribe(res => {
      this.nextLoanNumber = res;
    });
  }

  getAllLoanAdvanceByEmployeeId() {
    this.loanRequestService.getAllLoansByEmployee(this.employeeId, this.methodId).subscribe(result => {
      this.payrollEmployeeLoans = result;
      console.log(result);
      
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Payroll Employee Loan and Advances');
    });
  }


  openAddLoans() {
    const modalRef = this.modalService.open(PayrollEmployeeCreateLoanAdvancesComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.PayrollProcessId = this.id;
    modalRef.componentInstance.employeeId = this.employeeId;
    modalRef.componentInstance.employee = this.employee;
    modalRef.componentInstance.nextLoanNumber = this.nextLoanNumber;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLoanAdvanceByEmployeeId();
      }
    });
  }

  openEditLoans(loan) {
    const modalRef = this.modalService.open(PayrollEmployeeEditLoanAdvancesComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.componentInstance.paymentTypes = this.paymentTypes;
    modalRef.componentInstance.PayrollProcessId = this.id;
    modalRef.componentInstance.employeeId = this.employeeId;
    modalRef.componentInstance.loanFromList = loan;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLoanAdvanceByEmployeeId();
      }
    });
  }

  openViewLoans(employeeLoan) {
    const modalRef = this.modalService.open(PayrollEmployeeViewLoanAdvancesComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeLoan = employeeLoan;
    modalRef.componentInstance.loanTypes = this.loanTypes;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getAllLoanAdvanceByEmployeeId();
      }
    });
  }

    deleteLoans(loan) {
      const modalRef = this.modalService.open(ConfirmModalComponent,
        { centered: true, backdrop: 'static' });

      modalRef.componentInstance.confirmationMessage = `Are you sure you want to cancel the Loan Request ${loan.loanNumber}?`;
      modalRef.result.then((userResponse) => {
          if (userResponse == true) {
            this.loanRequestService.delete(loan.loanId).subscribe(() => {
              this.toastr.showSuccessMessage('The Loan Request cancelled successfully!');
              this.getAllLoanAdvanceByEmployeeId();
            });
          }
      });
    }
ngOnDestroy() {
  if (this.employeeSub) this.employeeSub.unsubscribe()
}
}
