import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeJobTitle } from './employee-job-title.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJobTitleService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/JobTitle/";
  }

  add(employeeJobTitle: EmployeeJobTitle){
    return this.http.post<EmployeeJobTitle>(this.baseUrl + 'insert', employeeJobTitle).pipe(map(response => { return response; }));
  }

  getAll(){
    return this.http.get<EmployeeJobTitle[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllJobTitleList(){
    return this.http.get<EmployeeJobTitle[]>(this.baseUrl + 'getAllJobTitleList').pipe(map(response => { return response; }));
  }

  update(employeeJobTitle: EmployeeJobTitle){
  return this.http.post<EmployeeJobTitle>(this.baseUrl + 'update', employeeJobTitle).pipe(map(response => { return response; }));
  }

  delete(id:number){
    return this.http.delete<EmployeeJobTitle>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeJobTitle>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
}
