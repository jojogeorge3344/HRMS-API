import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PayslipComponents } from './payslip-components.model';

@Injectable({
  providedIn: 'root'
})
export class PayslipComponentsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payslipsetting/";
  }
 
  add(payslipDetails: PayslipComponents) {
    return this.http.post<PayslipComponents>(this.baseUrl + 'insert', payslipDetails).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<PayslipComponents>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  getPayslipComponentById(id){
    return this.http.get<any>(this.baseUrl + 'GetPayslipSettingById/' + id).pipe(map(response => { return response; }));
  }
  update(payslipDetails: PayslipComponents) {
    return this.http.put<PayslipComponents>(this.baseUrl + 'update', payslipDetails).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayslipComponents>(this.baseUrl + 'deletePayslipSetting/' + id).pipe(map(response => { return response; }));
  }

  getSalaryStructure(){
    return this.http.get<any>(this.baseUrl + 'getAllPayrollStructure').pipe(map(response => { return response; }));
  }
  getBenefitCode(id){
    return this.http.get<any>(this.baseUrl + 'getComponentsByStructureId/' + id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<PayslipComponents>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

}
