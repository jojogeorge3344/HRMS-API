import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollStructure } from './payroll-structure.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PayrollStructureService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payrollstructure/";
  }

  get(id) {
    return this.http.get<PayrollStructure>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<PayrollStructure[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAssignedPayrollStructures() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedPayrollStructure').pipe(map(response => { return response; }));
  }

  getConfiguredPayrollStructures() {
    return this.http.get<PayrollStructure[]>(this.baseUrl + 'getAllConfiguredPayrollStructures').pipe(map(response => { return response; }));
  }

  add(payrollStructure: PayrollStructure) {
    return this.http.post<PayrollStructure>(this.baseUrl + 'insert', payrollStructure).pipe(map(response => { return response; }));
  }

  update(payrollStructure: PayrollStructure) {
    return this.http.post<PayrollStructure>(this.baseUrl + 'update', payrollStructure).pipe(map(response => { return response; }));
  }

  updatePayrollStructure(payrollStructureId: number, isConfigured: boolean) {
    return this.http.put(this.baseUrl + 'updatePayrollStructure/' + payrollStructureId + '/' + isConfigured, null).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollStructure>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getAllActived(id) {
    return this.http.get<PayrollStructure>(this.baseUrl + 'GetAllActived/' + id).pipe(map(response => { return response; }));
  }
}
