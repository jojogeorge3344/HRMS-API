import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollProcess } from './payroll-process.model';
import { PayrollReview } from './payroll-process-preview/payroll-process-preview.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessService {

  public baseUrl: string;
  public http: HttpClient;
  public employeeDetails: BehaviorSubject<any>

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.employeeDetails = <BehaviorSubject<any>>new BehaviorSubject(null);
    this.baseUrl = baseUrl + 'api/settings/payrollprocessing/PayrollProcessingMethod/';
  }

  add(payrollProcess: PayrollProcess) {
    return this.http.post<PayrollProcess>(this.baseUrl + 'insert', payrollProcess).pipe(map(response => response));
  }

  getAll() {
    return this.http.get<PayrollProcess[]>(this.baseUrl + 'GetAll').pipe(map(response => response));
  }

  update(payrollProcess: PayrollProcess) {
    return this.http.post<PayrollProcess>(this.baseUrl + 'update', payrollProcess).pipe(map(response => response));
  }
  updateProcessedStep(processId, step, processStep) {
    return this.http.put<PayrollProcess>(this.baseUrl + 'UpadtePayrollProcessingStep/' + processId + '/' + step, processStep).pipe(map(response => response));
  }

  delete(id: number) {
    return this.http.delete<PayrollProcess>(this.baseUrl + 'delete/' + id).pipe(map(response => response));
  }
  getPayrollBreakUp(payrollProcessId: number) {
    return this.http.get<PayrollReview[]>(this.baseUrl + 'GetAllPayrollReviewByProcessingMethodId/' + payrollProcessId).pipe(map(response => response));
  }
  insertLop(lop) {
    return this.http.post<PayrollProcess>(this.baseUrl + 'InsertLOPDeduction', lop)
      .pipe(map(response => response));
  }

  get( id) {
    return this.http.get<PayrollProcess>(this.baseUrl + 'GetEmployeeDetails/' +   id).pipe(map(response => response));
  }

  getEmployeeDetails(empid,id) {
    return this.http.get<PayrollProcess>(this.baseUrl + 'GetEmployeeDetails/' +empid+ "/"+   id).pipe(map(response => response));
  }
  updateProcess(payrollProcess) {
    return this.http.post<PayrollProcess>(this.baseUrl + 'InsertOrAlreadyExist/', payrollProcess).pipe(map(response => response));
  }

  getPayrollStatusByEmpId(empId,month,year) {
    
    return this.http.get(this.baseUrl + 'getDetailsById/' + empId+ '/'+ month +'/' + year).pipe(map(response => response));
  }

  getPreviousDetails() {
    return this.http.get<PayrollProcess[]>(this.baseUrl + 'GetPastSixMonthDetails/').pipe(map(response => response));
  }

  setEmployeeDetails(data) {
    this.employeeDetails.next(data)

  }

  getEmployeeDetailsSubject() {
    return this.employeeDetails.asObservable()

  }

}
