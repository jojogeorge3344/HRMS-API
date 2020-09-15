import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollLopService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/LossOfPay/LOPTracker';
  }
  getEmployeeLop(employeeId: number, payrollProcessingMethodId: number) {
    return this.http.get([this.baseUrl, 'GetLossOfPayDeductionByEmployee', employeeId, payrollProcessingMethodId].join('/')).pipe(map(response => { return response; }));

  }
}
