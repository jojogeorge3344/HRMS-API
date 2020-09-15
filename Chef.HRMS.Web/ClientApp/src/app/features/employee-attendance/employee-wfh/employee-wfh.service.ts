import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeWFHRequest } from './employee-wfh-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWFHService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/attendance/workfromhome/";
  }

  add(employeeWFHRequest: EmployeeWFHRequest){
    return this.http.post<EmployeeWFHRequest>(this.baseUrl + 'insert', employeeWFHRequest).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeWFHRequest>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(employeeWFHRequest: EmployeeWFHRequest){
  return this.http.post<EmployeeWFHRequest>(this.baseUrl + 'update', employeeWFHRequest).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeWFHRequest>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeWFHRequest>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  addNotifyPersonnel(notifyPersonnel) {
    return this.http.post(this.baseUrl + 'insertNotifyPersonnel/', notifyPersonnel).pipe(map(response => { return response; }));
  }

  getTotalRequestedDaysById(employeeId: number) {
    return this.http.get(this.baseUrl + 'getTotalRequestedDaysById/' + employeeId).pipe(map(response => { return response; }));
  }

  getAllWorkFromHomeById(employeeId: number) {
    return this.http.get(this.baseUrl + 'GetAllWorkFromHomeById/' + employeeId).pipe(map(response => { return response; }));
  }

}
