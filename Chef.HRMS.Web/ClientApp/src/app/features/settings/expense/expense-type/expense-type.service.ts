import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ExpenseType } from './expense-type.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseTypeService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/expense/expensetype/";
  }

  getAll() {
    return this.http.get<ExpenseType[]>(this.baseUrl + 'getall').pipe(map(response => { return response; }));
  }

  getAssignedExpenseTypes() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedExpenseTypes').pipe(map(response => { return response; }));
  }

  getAllByExpensePolicy(expensePolicyId) {
    return this.http.get<ExpenseType[]>(this.baseUrl + 'getallbyexpensepolicyid/' + expensePolicyId).pipe(map(response => { return response; }));
  }

  getAllExpenseTypeByCategory(category) {
    return this.http.get<ExpenseType>(this.baseUrl + 'getAllByExpenseCategory/' + category).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<ExpenseType>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(expensePolicy: ExpenseType) {
    return this.http.post<ExpenseType>(this.baseUrl + 'insert/', expensePolicy).pipe(map(response => { return response; }));
  }

  update(expensePolicy: ExpenseType) {
    return this.http.post<ExpenseType>(this.baseUrl + 'update/', expensePolicy).pipe(map(response => { return response; }));
  }

  delete(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}