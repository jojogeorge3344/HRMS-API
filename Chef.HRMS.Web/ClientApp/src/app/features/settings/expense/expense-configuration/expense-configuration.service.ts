import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseConfiguration } from './expense-configuration.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseConfigurationService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/expense/expensepolicyconfiguration/";
  }

  get(id) {
    return this.http.get<ExpenseConfiguration>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll(expensePolicyId) {
    return this.http.get<ExpenseConfiguration>(this.baseUrl + 'getAll/' + expensePolicyId).pipe(map(response => { return response; }));
  }

  add(expenseConfiguration: ExpenseConfiguration[], expenseConfigurationIds) {
    return this.http.post<ExpenseConfiguration>(this.baseUrl + 'insert', { expensePolicyConfiguration: expenseConfiguration, expensePolicyConfigurationIds: expenseConfigurationIds }).pipe(map(response => { return response; }));
  }

  update(expenseConfiguration: ExpenseConfiguration) {
    return this.http.post<ExpenseConfiguration>(this.baseUrl + 'update', expenseConfiguration).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<ExpenseConfiguration>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getExpenseTypes(employeeId) {
    return this.http.get<ExpenseConfiguration>(this.baseUrl + 'getExpenseTypesById/' + employeeId).pipe(map(response => { return response; }));
  }
}