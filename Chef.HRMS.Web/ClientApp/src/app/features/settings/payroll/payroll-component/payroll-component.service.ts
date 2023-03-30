import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollComponent } from './payroll-component.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PayrollComponentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payrollcomponent/";
  }

  get(id) {
    return this.http.get<PayrollComponent>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<PayrollComponent[]>(this.baseUrl + 'getAllOrderByPayrollComponent').pipe(map(response => { return response; }));
  }

  getAllAssignedPayrollComponents() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedPayrollComponents').pipe(map(response => { return response; }));
  }

  // getAllPayrollComponentByType(payrollComponentType) {
  //   return this.http.get<PayrollComponent>(this.baseUrl + 'getAllPayrollComponentByType/' + payrollComponentType).pipe(map(response => { return response; }));
  // }
  getAllPayrollComponentByType() {
    return this.http.get<any>(this.baseUrl + 'getComponentType/').pipe(map(response => { return response; }));
  }

  
  add(payrollComponent: PayrollComponent) {
    return this.http.post<PayrollComponent>(this.baseUrl + 'insert', payrollComponent).pipe(map(response => { return response; }));
  }

  update(payrollComponent: PayrollComponent) {
    return this.http.post<PayrollComponent>(this.baseUrl + 'update', payrollComponent).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollComponent>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
