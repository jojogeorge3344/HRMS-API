import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeLoanView } from '../payroll-process-adhoc/payroll-process-loans-advances.viewmodel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollLoanAdvancesService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/Loan/LoanPayment/';
  }

  getAllLoans(employeeId, processId) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanPaymentByEmployeeId/' + employeeId + '/' + processId).pipe(map(response => { return response; }));
  }
  getLoansByProcess(processId) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanPaymentByPayrollProcessingMethodId/' + processId).pipe(map(response => { return response; }));

  }
  insert(loanAdvances) {
    return this.http.post<number>(this.baseUrl + 'insert/', loanAdvances).pipe(map(response => { return response; }));

  }

}
