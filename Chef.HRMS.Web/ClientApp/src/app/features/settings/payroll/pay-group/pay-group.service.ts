import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayGroup } from './pay-group.model';
import { Employee } from '@features/employee/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayGroupService {

  public baseUrl: string;
  public currencyUrl:string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/PayGroup/";
    this.currencyUrl=baseUrl + "api/common/masterData/"
  }

  getAll() {
    return this.http.get<PayGroup[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getAllAssignedPayGroups() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedPayGroup').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<PayGroup>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
 
  getAllByPaygroup(paygroupId: number, year: number, month: number) {
    return this.http.get<Employee[]>(this.baseUrl + 'GetAllEmployeeByPayGroupId/' + paygroupId + '/' + year + '/' + month).pipe(map(response => { return response; }));
  }
  add(paygroup: PayGroup) {
    return this.http.post(this.baseUrl + 'insert', paygroup).pipe(map(response => { return response; }));
  }

  update(paygroup: PayGroup) {
    return this.http.put<number>(this.baseUrl + 'update', paygroup).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getCurrencies() {
    return this.http.get<number[]>(this.currencyUrl + 'getCurrencies').pipe(map(response => { return response; }));
  }

}
