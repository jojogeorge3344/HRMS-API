import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ExpensePolicy } from './expense-policy.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensePolicyService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/expense/expensepolicy/";
  }

  getAll() {
    return this.http.get<ExpensePolicy[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllAssignedExpensePolicies() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedExpensePolicy').pipe(map(response => { return response; }));
  }

  getAllConfiguredExpensePolicies() {
    return this.http.get<ExpensePolicy[]>(this.baseUrl + 'getAllConfiguredExpensePolicies').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<ExpensePolicy>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(expensePolicy: ExpensePolicy) {
    return this.http.post<ExpensePolicy>(this.baseUrl + 'insert', expensePolicy).pipe(map(response => { return response; }));
  }

  update(expensePolicy: ExpensePolicy) {
    return this.http.post(this.baseUrl + 'update', expensePolicy).pipe(map(response => { return response; }));
  }

  updateExpensePolicy(expensePolicyId: number, isConfigured: boolean) {
    return this.http.put(this.baseUrl + 'updateExpensePolicy/' + expensePolicyId + '/' + isConfigured, null).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<ExpensePolicy>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
