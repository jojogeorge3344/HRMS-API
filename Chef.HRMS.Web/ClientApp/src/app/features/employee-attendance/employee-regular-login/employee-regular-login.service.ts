import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeRegularLogin } from "./employee-regular-login.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeRegularLoginService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/attendance/RegularLogin/";
  }

  add(employeeRegularLogin: EmployeeRegularLogin){
    return this.http.post<EmployeeRegularLogin>(this.baseUrl + 'insert', employeeRegularLogin).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeRegularLogin>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  update(employeeRegularLogin: EmployeeRegularLogin){
    return this.http.post<EmployeeRegularLogin>(this.baseUrl + 'update', employeeRegularLogin).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeRegularLogin>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeRegularLogin>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAverageAttendanceById(id,type) {
    return this.http.get<EmployeeRegularLogin>(this.baseUrl + 'GetAverageAttendanceById/' + id + '/' + type).pipe(map(response => { return response; }));
  }

  getAverageOnTimeDetails(id,type) {
    return this.http.get<EmployeeRegularLogin>(this.baseUrl + 'GetAverageOnTimeDetails/' + id + '/' + type).pipe(map(response => { return response; }));
  }

}
