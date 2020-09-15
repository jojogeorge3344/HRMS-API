import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessPreviewBreakUpService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payrollprocessing/PayrollBasicComponent/";
  }

  getPayrollBreakUp(id: number, payrollProcessingMethodId: number){
    return this.http.get<[]>(this.baseUrl + 'GetPayrollBreakUpByEmployeeId' + '/' + id + '/' + payrollProcessingMethodId);
  }

}
