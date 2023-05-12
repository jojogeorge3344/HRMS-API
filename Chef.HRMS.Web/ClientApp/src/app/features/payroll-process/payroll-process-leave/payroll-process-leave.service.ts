import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollLeaveAndAttandance } from './Payroll-Process-leave-attendance.model';
import { PayrollLeaveAndAttandanceViewModel } from './payroll-process-leave-attendance-view.model';
import { map, reduce } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollProcessLeaveService {

  public baseUrl: string;
  public http: HttpClient;
  public baseUrl_leaveDetails :string

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/settings/payrollprocessing/LeaveAndAttendance/';
    this.baseUrl_leaveDetails = baseUrl + 'api/payrollleavedetails/'
  }

  getAll(payGroupId, fromDate, toDate) {
    return this.http.get<PayrollLeaveAndAttandanceViewModel[]>(this.baseUrl + 'GetAllLeaveAndAttendanceByPaygroup/' + payGroupId + '/' + fromDate + '/' + toDate).pipe(map(response => { return response; }));
  }
  getByEmployee(employeeId, payrollProcessId) {
    return this.http.get<PayrollLeaveAndAttandanceViewModel>(this.baseUrl + 'GetLeaveAndAttendanceByEmployeeId/' + employeeId + '/' + payrollProcessId).pipe(map(response => { return response; }));

  }
  getByEmployeeLeaves(employeeId, fromDate, toDate) {
    return this.http.get<any>(this.baseUrl + 'GetAllLeaveAndAttendanceByEmployeeId/' + employeeId + '/' + fromDate + '/' + toDate)
      .pipe(
        map(res => {
          const obj: any = {};
          res.map(i => {
            obj[i.type] = i.totalCount;
          });
          return obj;
        })
      );

  }

  getAllApprovedLeaveDetails(payGroupId, fromDate, toDate) {
    return this.http.get<PayrollLeaveAndAttandanceViewModel[]>(this.baseUrl + 'GetAllApprovedLeaveDetailsByEmployeeId/' + payGroupId + '/' + fromDate + '/' + toDate).pipe(map(response => { return response; }));
  }

  getAllUnapprovedLeaveDetails(payGroupId, fromDate, toDate) {
    return this.http.get<PayrollLeaveAndAttandanceViewModel[]>(this.baseUrl + 'GetAllUnapprovedLeaveDetailsByEmployeeId/' + payGroupId + '/' + fromDate + '/' + toDate).pipe(map(response => { return response; }));
  }

  getAllUnmarkedAttendanceDetails(payGroupId, fromDate, toDate) {
    return this.http.get<any[]>(this.baseUrl + 'GetAllUnmarkedAttendanceDetailsByEmployeeId/' + payGroupId + '/' + fromDate + '/' + toDate)
    .pipe(
      map(response => { 
       return response.map(
          date =>{
            return {
              date: date,
              leaveComponentId: 0
            }
          }
        )
    }));
  }

  add(PayrollLeaveAndAttandance) {
    return this.http.post<PayrollLeaveAndAttandance[]>(this.baseUrl + 'InsertLeaveAndAttendanceDetails', PayrollLeaveAndAttandance).pipe(map(response => { return response; }));
  }

  update(PayrollLeaveAndAttandance: PayrollLeaveAndAttandance[]) {
    return this.http.post<PayrollLeaveAndAttandance[]>(this.baseUrl + 'update', PayrollLeaveAndAttandance).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<PayrollLeaveAndAttandance>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getNoOfEmployees(id: number) {
    return this.http.get(this.baseUrl + 'GetNumberOfEmployeesByPaygroup/' + id).pipe(map(response => { return response; }));
  }

  InsertPayrollLeaveDetails(leavedetails){
    return this.http.post(this.baseUrl_leaveDetails + 'insert', leavedetails).pipe(map(response => response));
  
   }

  

}
