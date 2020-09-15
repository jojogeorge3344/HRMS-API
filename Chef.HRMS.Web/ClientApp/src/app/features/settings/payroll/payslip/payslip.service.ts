import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { PayslipConfigurationField } from "./payslip-configuration-field.model";
import { PayslipConfiguration } from "./payslip-configuration.model";

@Injectable({
  providedIn: 'root'
})
export class PayslipService {

  public baseUrl: string;
  public configurationFieldsUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/settings/payroll/PayslipConfiguration/`;
    this.configurationFieldsUrl = `${baseUrl}api/settings/payroll/PayslipConfigurationFields/`;
  }

  get(id: number) {
    return this.http.get<PayslipConfiguration>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(paygroup: PayslipConfiguration) {
    return this.http.post(this.baseUrl + 'insert', paygroup).pipe(map(response => { return response; }));
  }

  update(paygroup: PayslipConfiguration) {
    return this.http.put<number>(this.baseUrl + 'update', paygroup).pipe(map(response => { return response; }));
  }
  getConfigurationFields() {
    return this.http.get<PayslipConfigurationField[]>(`${this.configurationFieldsUrl}getall/`)
      .pipe(
        map(fields => fields.map(field => {
          return { name: field.name, status: field.status, orders: field.orders, id: field.id };
        }))
      );
  }
  updateConfigurationFields(configurationFields: PayslipConfigurationField[]) {
    return this.http.post(`${this.configurationFieldsUrl}UpdatePayslipConfigurationFieldsAsync`, configurationFields).pipe(map(response => { return response; }));
  }
}
