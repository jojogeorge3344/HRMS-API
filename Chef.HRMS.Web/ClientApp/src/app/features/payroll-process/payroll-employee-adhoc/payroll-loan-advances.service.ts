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
  baseUrl_loan:any
  baseUrl_adhocDeduction:any

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/Loan/LoanPayment/';
    this.baseUrl_loan = baseUrl + 'api/settings/payrollprocessing/PayrollLoanDetails/'
    this.baseUrl_adhocDeduction = baseUrl + 'api/settings/payrollprocessing/PayrollAdhocDetails/'
  }

  getAllLoans(employeeId, processId) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanPaymentByEmployeeId/' + employeeId + '/' + processId).pipe(map(response => { return response; }));
  }
  getLoansByProcess(processId,year,month) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanPaymentByPayrollProcessingMethodId?payGroupId=' + processId + '&year=' + year + '&month=' + month).pipe(map(response => { return response; }));

  }
  insert(loanAdvances) {
    return this.http.post<number>(this.baseUrl + 'insert/', loanAdvances).pipe(map(response => { return response; }));

  }

  saveAdhocLoan(loanAdvances){
    return this.http.post<number>(this.baseUrl_loan + 'insert/', loanAdvances).pipe(map(response => { return response; }));
  }
  saveAdhocdeduction(adhocDeduction){
    return this.http.post<number>(this.baseUrl_adhocDeduction + 'insert/', adhocDeduction).pipe(map(response => { return response; }));
  }

}
