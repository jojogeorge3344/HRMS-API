import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeBankDetails } from "./employee-bank-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBankDetailsService {

  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/EmployeeBankAccount/";
  }

  getall() {
    return this.http.get<EmployeeBankDetails[]>(this.baseUrl + 'getall/').pipe(map(response => { return response; }));
  }

  update(BankDetails: EmployeeBankDetails) {
    return this.http.post(this.baseUrl + 'update', BankDetails).pipe(map(response => { return response; }));    
  }

  insert(BankDetails: EmployeeBankDetails) {
    return this.http.post<EmployeeBankDetails>(this.baseUrl + 'insert', BankDetails).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id, {}).pipe(map(response => { return response; }));
  }
}
