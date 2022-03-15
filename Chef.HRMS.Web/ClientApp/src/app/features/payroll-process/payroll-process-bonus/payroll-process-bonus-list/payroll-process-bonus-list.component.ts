import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PayrollProcessBonusViewComponent } from '../payroll-process-bonus-view/payroll-process-bonus-view.component';
import { ConfirmModalComponent } from '@shared/dialogs/confirm-modal/confirm-modal.component';
import { PayrollProcessBonusEditComponent } from '../payroll-process-bonus-edit/payroll-process-bonus-edit.component';
import { PayrollProcessLoanViewComponent } from '../payroll-process-loan-view/payroll-process-loan-view.component';
import { PayrollProcessLoanEditComponent } from '../payroll-process-loan-edit/payroll-process-loan-edit.component';
import { PayrollProcessBonusCreateComponent } from '../payroll-process-bonus-create/payroll-process-bonus-create.component';
import { PayrollProcessLoanCreateComponent } from '../payroll-process-loan-create/payroll-process-loan-create.component';
import { EmployeeBonusService } from '@features/employee/employee-bonus/employee-bonus.service';
import { EmployeeBonus } from '@features/employee/employee-bonus/employee-bonus.model';
import { LoanRequestService } from '../../../employee-loan/loan-request.service';
import { forkJoin } from 'rxjs';
import { BonusTypes } from '@features/employee/employee-bonus/bonus-types.model';
import { LoanType } from 'src/app/models/common/types/loantype';
import { ActivatedRoute, Router } from '@angular/router';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { Employee } from '@features/employee/employee.model';
import { PayrollProcessService } from '../../payroll-process.service';
import { EmployeeLoanView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-loans-advances.viewmodel';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-bonus-list',
  templateUrl: './payroll-process-bonus-list.component.html'
})
export class PayrollProcessBonusListComponent implements OnInit {
  @Output() selectTab = new EventEmitter<number>();
  employeeList: Employee[] = [];
  bonuses: EmployeeBonus[] = [];
  bonusTypes: BonusTypes[];
  loans: EmployeeLoanView[] = [];
  loanTypes = LoanType;
  paygroupId: number;
  id: any;
  date: any;
  selectedYear: any;
  selectedMonth: any;
  nextLoanNumber: number;
  months = Months;
  constructor(
    private bonusService: EmployeeBonusService,
    private route: ActivatedRoute,
    private loanRequestService: LoanRequestService,
    private payGroupService: PayGroupService,
    public modalService: NgbModal,
    private payrollProcessService: PayrollProcessService,
    private router: Router,
    private toastr: ToasterDisplayService
  ) {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.paygroupId = parseInt(params.payGroup, 10);
      this.id = parseInt(params.id, 10);
    });
  }

  ngOnInit(): void {
    this.payGroupService.getAllByPaygroup(this.paygroupId, this.selectedYear, this.selectedMonth )
      .subscribe(res => {
        this.employeeList = res;
      });

    this.bonusService.getBonusTypes().subscribe(res => {
      this.bonusTypes = res;
    });
    this.getBonusAndLoans();

  }
  getBonusAndLoans() {
    this.loanRequestService.getLoanId().subscribe(res => {
      this.nextLoanNumber = res;
    });
    forkJoin([this.bonusService.getBonusByPaygroup(this.id), this.loanRequestService.getAllLoans(this.id)])
      .subscribe(([bonusRes, loanRes]) => {
        this.bonuses = bonusRes;
        this.loans = loanRes;
        console.log(this.bonuses);        
        console.log("sameeeeeeeeeera",this.loans);
        
      });
  }
  viewEditBonus(bonus) {
    const modalRef = this.modalService.open(PayrollProcessBonusViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    bonus = {
      ...bonus,
      disburseOn: new Date(bonus.disburseOn),
      remarks: bonus.remarks,
      id: bonus.employeebonusid,
      employeeId: { id: bonus.employeeid, firstName: bonus.name }
    };
    modalRef.componentInstance.bonus = bonus;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });

  }
  openCreateBonus() {
    const modalRef = this.modalService.open(PayrollProcessBonusCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });
  }
  openEditBonus(bonus) {
    const modalRef = this.modalService.open(PayrollProcessBonusEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.bonusTypes = this.bonusTypes;
    bonus = {
      ...bonus,
      disburseOn: new Date(bonus.disburseOn),
      remarks: bonus.remarks,
      id: bonus.employeeBonusId,
      employeeId: { id: bonus.employeeid, firstName: bonus.name }
    };
    modalRef.componentInstance.bonus = bonus;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });

  }
  deleteBonus(bonus) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the bonus ${bonus.bonusType} for ${bonus.name} ?`;
    modalRef.result.then((userResponse) => {
      if (userResponse == true) {
        this.bonusService.delete(bonus.employeeBonusId).subscribe(() => {
          this.toastr.showSuccessMessage('The bonus deleted successfully!');
          this.getBonusAndLoans();
        });
      }
    });

  }
  viewEditLoan(loan) {
    const modalRef = this.modalService.open(PayrollProcessLoanViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.loanFromList = loan;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });

  }
  openEditLoan(loan) {
    const modalRef = this.modalService.open(PayrollProcessLoanEditComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.loanFromList = loan;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });

  }
  openCreateLoan() {
    const modalRef = this.modalService.open(PayrollProcessLoanCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.employeeList = this.employeeList;
    modalRef.componentInstance.nextLoanNumber = this.nextLoanNumber;

    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.getBonusAndLoans();
      }
    }, error => {
      console.log(error);
    });
  }
  deleteLoan(loan) {
    const modalRef = this.modalService.open(ConfirmModalComponent,
      { centered: true, backdrop: 'static' });
    modalRef.componentInstance.confirmationMessage = `Are you sure you want to delete the loan ${loan.loanNumber} ?`;

    modalRef.result.then((userResponse) => {
      if (userResponse === true) {
        this.loanRequestService.delete(loan.loanId).subscribe(() => {
          this.toastr.showSuccessMessage('The loan deleted successfully!');
          this.getBonusAndLoans();
        });
      }
    });
  }

  onSubmit(routeTo) {
    this.payrollProcessService.updateProcessedStep(this.id, 3, { id: this.id, stepNumber: 3 })
      .subscribe(res => {
        this.toastr.showSuccessMessage('Payroll Bonus, Loans and Advances Processing Completed');
        if (routeTo === 'continue') {
          this.selectTab.emit(4);
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

}
