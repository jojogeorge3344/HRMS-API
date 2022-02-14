import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseRequest } from './expense-request.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseRequestService {

  public baseUrl: string;
  public http: HttpClient;
  assignedType: BehaviorSubject<any>=new BehaviorSubject(null);

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/expense/";
  }

  getAll() {
    return this.http.get<ExpenseRequest[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getAllExpenseDetailsById(employeeId: number) {
    return this.http.get<ExpenseRequest[]>(this.baseUrl + 'getAllExpenseDetailsById/' + employeeId).pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<ExpenseRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getMaximumExpenseAmountById(employeeId: number, expenseConfigurationId: number, periodType: number, currentDate: string) {
    return this.http.get(this.baseUrl + 'getMaximumExpenseAmountById/' + employeeId + '/' + expenseConfigurationId + '/' + periodType + '/' + currentDate).pipe(map(response => { return response; }));
  }

  getMaximumInstancesById(employeeId: number, expenseConfigurationId: number, periodType: number) {
    return this.http.get(this.baseUrl + 'getMaximumInstancesById/' + employeeId + '/' + expenseConfigurationId + '/' + periodType).pipe(map(response => { return response; }));
  }

  add(expenseRequest: ExpenseRequest) {
    return this.http.post(this.baseUrl + 'insert', expenseRequest).pipe(map(response => { return response; }));
  }

  update(expenseRequest: ExpenseRequest) {
    return this.http.post<number>(this.baseUrl + 'update', expenseRequest).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getUnapprovedExpense(employeeId: number) {
    return this.http.get<ExpenseRequest[]>(this.baseUrl + 'GetAllUnApprovedExpenseById/' + employeeId)
      .pipe(map(response => response));
  }
}
