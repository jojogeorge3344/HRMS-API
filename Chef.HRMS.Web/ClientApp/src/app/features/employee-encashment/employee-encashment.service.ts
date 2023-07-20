import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeEncashment } from './employee-encashment.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeEncashmentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/EmployeeEncashment/';
  }

  add(employeeEncashment) {
    return this.http.post<EmployeeEncashment>(this.baseUrl + 'EmployeeEncashmentInsert', employeeEncashment).pipe(map(response => { return response; }));
  }
  getAll() {
    return this.http.get<EmployeeEncashment>(this.baseUrl + 'getEmployeeEncashmentList').pipe(map(response => { return response; }));
  }
  get(id:number){
    return this.http.get<EmployeeEncashment>(this.baseUrl + 'getEmployeeEncashmentById/' + id).pipe(map(response => { return response; }));
  }
  update(employeeEncashment){
    return this.http.post<EmployeeEncashment>(this.baseUrl + 'EmployeeEncashmentUpdate',employeeEncashment).pipe(map(response => { return response; }));
  }
  delete(id:number){
    return this.http.delete(this.baseUrl + 'EmployeeEncashmentDelete/' + id).pipe(map(response => { return response; }));
  }
  process(id){
    return this.http.post<EmployeeEncashment>(this.baseUrl + 'EmployeeEncashmentProcess/',id).pipe(map(response => { return response; }));
  }
  getComponent(id:number){
    return this.http.get<EmployeeEncashment>(this.baseUrl + 'getEmployeeEncashmentComponents/' + id).pipe(map(response => { return response; }));
  }
  getBalanceLeave(fromdate,todate,employeeid){
    return this.http.get<EmployeeEncashment>(this.baseUrl + 'getLeaveBalanceDetails/' + fromdate +'/'+ todate + '/' + employeeid).pipe(map(response => { return response; }));
  }
}
