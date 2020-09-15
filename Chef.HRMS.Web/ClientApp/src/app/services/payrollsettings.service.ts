import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollSystemVariable } from 'src/app/models/payrollsystemvariable';

@Injectable({
  providedIn: 'root'
})
export class PayrollsettingsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/PayrollSystemVariable/";
  }

  getAll() {
    return this.http.get<PayrollSystemVariable>(this.baseUrl + 'GetAll');
  }

}
