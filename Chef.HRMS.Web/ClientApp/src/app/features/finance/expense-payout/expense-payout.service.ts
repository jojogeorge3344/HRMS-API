import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpensePayout } from './expense-payout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensePayoutService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/Expense/ExpensePayment';

  }

  getApprovedExpense() {
    return this.http.get<ExpensePayout[]>([this.baseUrl, 'GetAllApprovedExpense'].join('/'))
      .pipe(
        map(expenseRequests => expenseRequests.map(expenseRequest => {
          return {
            ...expenseRequest,
            paymentAccount: expenseRequest.paymentAccount === 0 ? '' : expenseRequest.paymentAccount,
            paymentMode: expenseRequest.paymentMode === 0 ? '' : expenseRequest.paymentMode,

          }
        }))
      );
  }
  getPaidOutExpenses(){
    return this.http.get<ExpensePayout[]>([this.baseUrl, 'GetAllPaidOutExpense'].join('/'))
    .pipe(map(response => response));

  }

  insert(expense) {
    return this.http.post<ExpensePayout>([this.baseUrl, 'insert'].join('/'), expense)
      .pipe(map(response => response));
  }

  updateStatus(expenseId: number, paymentMode: number) {
    return this.http.put<ExpensePayout>([this.baseUrl, 'UpdateExpenseStatus', expenseId, paymentMode].join('/'), {})
      .pipe(map(response => response));
  }
}
