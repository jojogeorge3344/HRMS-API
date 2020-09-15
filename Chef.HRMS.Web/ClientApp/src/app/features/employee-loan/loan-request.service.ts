import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanRequest } from './loan-request.model';
import { EmployeeLoanView } from '@features/payroll-process/payroll-process-adhoc/payroll-process-loans-advances.viewmodel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanRequestService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/loanRequest/';

  }

  getAll() {
    return this.http.get<LoanRequest[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<LoanRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getByPaygroup(id: number) {
    return this.http.get<LoanRequest[]>(this.baseUrl + 'GetAllLoanByPayGroupId/' + id).pipe(map(response => { return response; }));
  }

  getAllLoans(id) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanByPayrollProcessingMethodId/' + id).pipe(map(response => { return response; }));
  }
  getAllLoansByEmployee(employeeId, processId) {
    return this.http.get<EmployeeLoanView[]>(this.baseUrl + 'GetAllLoanByEmployeeId/' + employeeId + '/' + processId).pipe(map(response => { return response; }));
  }
  getLoanId() {
    return this.http.get<number>(this.baseUrl + 'GetLoanLastRequestId/').pipe(
      map(res => ++res)
    );
  }
  add(loanRequest: LoanRequest) {
    return this.http.post<LoanRequest>(this.baseUrl + 'insert', loanRequest).pipe(map(response => { return response; }));
  }

  update(loanRequest: LoanRequest) {
    return this.http.post<LoanRequest>(this.baseUrl + 'update', loanRequest).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<LoanRequest>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
