import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpenseDocument } from './expense-document.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDocumentService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/expenseDocument/";
  }

  get(id) {
    return this.http.get<ExpenseDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getDocumentById(expenseRequestId: number) {
    return this.http.get<Document>(this.baseUrl + 'getDocumentById/' + expenseRequestId).pipe(map(response => { return response; }));
  }

  add(expenseDocument: ExpenseDocument) {
    return this.http.post<ExpenseDocument>(this.baseUrl + 'insert', expenseDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<ExpenseDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
