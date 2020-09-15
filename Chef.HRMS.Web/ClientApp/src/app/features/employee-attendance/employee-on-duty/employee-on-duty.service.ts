import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeOnDutyRequest } from './employee-on-duty-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeOnDutyService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/attendance/onduty/";
  }

  add(employeeOnDutyRequest: EmployeeOnDutyRequest){
    return this.http.post<EmployeeOnDutyRequest>(this.baseUrl + 'insert', employeeOnDutyRequest).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeOnDutyRequest>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(employeeOnDutyRequest: EmployeeOnDutyRequest){
  return this.http.post<EmployeeOnDutyRequest>(this.baseUrl + 'update', employeeOnDutyRequest).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeOnDutyRequest>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeOnDutyRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  addNotifyPersonnel(notifyPersonnel) {
    return this.http.post(this.baseUrl + 'insertNotifyPersonnel/', notifyPersonnel).pipe(map(response => { return response; }));
  }

  getTotalRequestedDaysById(id) {
    return this.http.get(this.baseUrl + 'GetTotalRequestedDaysById/' + id );
  }
   
}
