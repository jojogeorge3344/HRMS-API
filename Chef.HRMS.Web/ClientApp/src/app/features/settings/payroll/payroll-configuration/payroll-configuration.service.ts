import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollConfiguration } from './payroll-configuration.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PayrollConfigurationService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payrollcomponentconfiguration/";
  }

  get(id) {
    return this.http.get<PayrollConfiguration>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll(payrollStructureId) {
    return this.http.get<PayrollConfiguration[]>(this.baseUrl + 'getAll/' + payrollStructureId).pipe(map(response => { return response; }));
  }

  add(payrollConfiguration: PayrollConfiguration[], payrollConfigurationIds) {
    return this.http.post<PayrollConfiguration>(this.baseUrl + 'insert', { payrollComponentConfiguration: payrollConfiguration, payrollComponentConfigurationIds: payrollConfigurationIds }).pipe(map(response => { return response; }));
  }

  update(payrollConfiguration: PayrollConfiguration) {
    return this.http.post<PayrollConfiguration>(this.baseUrl + 'update', payrollConfiguration).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollConfiguration>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
