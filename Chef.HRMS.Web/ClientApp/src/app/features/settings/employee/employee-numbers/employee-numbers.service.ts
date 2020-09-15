import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeNumbers } from './employee-numbers.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeNumbersService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.http = http;
    this.baseUrl = baseUrl + "api/EmployeeNumberSeries/";
  }

  getAll(){
    return this.http.get<EmployeeNumbers[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAllActiveNumberSeries(){
    return this.http.get<EmployeeNumbers[]>(this.baseUrl + 'getAllActiveNumberSeries').pipe(map(response => { return response; }));
  }

  getAllAssignedNumberSeries() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedNumberSeries').pipe(map(response => { return response; }));
  }

  update(employeeNumbers: EmployeeNumbers){
    return this.http.post<EmployeeNumbers>(this.baseUrl + 'update', employeeNumbers).pipe(map(response => { return response; }));
  }

  add(employeeNumbers: EmployeeNumbers){
    return this.http.post<EmployeeNumbers>(this.baseUrl + 'insert', employeeNumbers).pipe(map(response => { return response; }));
    }

  delete(id:number){
    return this.http.delete<EmployeeNumbers>(this.baseUrl + 'delete/'+id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeNumbers>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}
