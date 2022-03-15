import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { ExpensePayoutService } from '../expense-payout.service';
import { ExpensePayout } from '../expense-payout';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { NumberToWordsPipe } from 'src/app/pipes/number-to-words.pipe';
import { ExpensePayoutComponent } from '../expense-payout/expense-payout.component';
import { forkJoin } from 'rxjs';
import { PaymentMode } from 'src/app/models/common/types/paymentmode';
import { ExpensePayoutViewComponent } from '../expense-payout-view/expense-payout-view.component';
import { map } from 'rxjs/operators';
import { EmployeeService } from '@features/employee/employee.service';
import { Employee } from '@features/employee/employee.model';

@Component({
  selector: 'hrms-expense-payout-list',
  templateUrl: './expense-payout-list.component.html'
})
export class ExpensePayoutListComponent implements OnInit, OnDestroy {
  expenses = [];
  expense;
  paymentMode = PaymentMode;
  employees: Employee[];
  constructor(
    private splitByUpperCasePipe: SplitByUpperCasePipe,
    private numberToWordsPipe: NumberToWordsPipe,
    private datePipe: DatePipe,
    private employeeService: EmployeeService,
    private expensePayoutService: ExpensePayoutService,
    public modalService: NgbModal,

  ) { }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.getApprovedExpenses();
    this.employeeService.getAll().subscribe(result => {
      this.employees = result;
    });
  }
  getApprovedExpenses() {
    forkJoin(
      [this.expensePayoutService.getApprovedExpense(), this.expensePayoutService.getPaidOutExpenses()])
      .pipe(
        map(([s1, s2]) => [...s1, ...s2])
      )
      .subscribe(res => {
        this.expenses = res;
        this.expense = res[3];
      });
  }
  openPayOut(expense: ExpensePayout) {
    const modalRef = this.modalService.open(ExpensePayoutComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    expense.expenseDate = new Date(expense.expenseDate);
    modalRef.componentInstance.expense = expense;

    modalRef.result.then((result) => {
      if (result === 'submit') {
        this.getApprovedExpenses();
      }
    }, error => { });
  }
  openView(expense: ExpensePayout) {
    const modalRef = this.modalService.open(ExpensePayoutViewComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    expense.expenseDate = new Date(expense.expenseDate);
    modalRef.componentInstance.expense = expense;
  }
  downloadPdf(expense: ExpensePayout) {
    const modifiedBy = this.employees.find(emp => emp.id === expense.modifiedBy)
    const doc = new jsPDF('p', 'mm', 'a4');
    const header = function (data) {
      doc.setFontSize(18);
      doc.setTextColor(40);
      doc.setFontStyle('normal');
      doc.text('Expense Payment Voucher', data.settings.margin.left, 20);
    };
    autoTable(doc, {
      theme: 'grid',
      margin: { top: 25 },
      columnStyles: { 0: { cellWidth: 40, }, 1:{ fontSize: 8, fontStyle: 'bold' } },
      didDrawPage: header,
      didDrawCell: (data) => {
      },
      body: [
        ['Expense Title', expense.name],
        ['Expense Type', expense.expenseTypeName],
        ['Expense Date', this.datePipe.transform(expense.expenseDate)],
        [
          'Payment Mode',
          this.splitByUpperCasePipe.transform(this.paymentMode[expense.paymentMode])],

        ['Amount', expense.amount],
        ['Amount in words', this.numberToWordsPipe.transform(expense.amount)],
        ['Remarks', expense.comment],
        ['Approved By', `${modifiedBy.firstName || ''} ${modifiedBy.middleName || ''} ${modifiedBy.lastName || ''}`],
       // ['Approved By \n', expense.modifiedBy.toString()],
        ['Paid By', `${modifiedBy.firstName || ''} ${modifiedBy.middleName || ''} ${modifiedBy.lastName || ''}`],
        ['Paid Date', this.datePipe.transform(expense.modifiedDate)]
      ],
    });
    doc.save('expense-voucher.pdf');
  }
}
