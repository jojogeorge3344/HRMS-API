import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OvertimeRequest } from './overtime-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OvertimeRequestService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/overtime/";
  }

  getAll() {
    return this.http.get<OvertimeRequest[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getAssignedOverTimePolicy(employeeId: number) {
    return this.http.get<number>(this.baseUrl + 'GetAssignedOverTimePolicy/' + employeeId).pipe(map(response => { return response; }));
  }

  getAllOvertimeDetailsById(employeeId: number) {
    return this.http.get<OvertimeRequest[]>(this.baseUrl + 'getAllOvertimeDetailsById/' + employeeId).pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<OvertimeRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(overtimeRequest: OvertimeRequest) {
    return this.http.post<OvertimeRequest>(this.baseUrl + 'insert', overtimeRequest).pipe(map(response => { return response; }));
  }

  update(overtimeRequest: OvertimeRequest) {
    return this.http.put<number>(this.baseUrl + 'update', overtimeRequest).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  addNotifyPersonnel(notifyPersonnel) {
    return this.http.post(this.baseUrl + 'insertNotifyPersonnel/', notifyPersonnel).pipe(map(response => { return response; }));
  }

  getOvertimeNotifyPersonnelByOvertimeId(id: number) {
    return this.http.get(this.baseUrl + 'getOvertimeNotifyPersonnelByOvertimeId/' + id).pipe(map(response => { return response; }));
  }

  getMarkedDates(empId:number){
    return this.http.get<any>(this.baseUrl + 'appliedDates/' + empId)
      .pipe(
        map((res: string[]) => res.join('~!~'))
      );
  }

  // getPayrollStatusByEmpId(checkPayrollProcessed) {
  //   return this.http.get(this.baseUrl + 'getDetailsById/', checkPayrollProcessed).pipe(map(response => { return response; }));
  // }
}
