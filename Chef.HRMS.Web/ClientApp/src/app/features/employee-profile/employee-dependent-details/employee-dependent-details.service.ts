import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDependentDetails } from "./employee-dependent-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDependentDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/dependent";
  }
  getAll(employeeId) {
    return this.http.get<EmployeeDependentDetails[]>(this.baseUrl + '/GetByEmployeeId/' + employeeId).pipe(map(response => { return response; }));
  }
  insert(dependentDetails: EmployeeDependentDetails) {
    return this.http.post<EmployeeDependentDetails>(this.baseUrl + '/insert', dependentDetails).pipe(map(response => { return response; }));
  }
  update(dependentDetails: EmployeeDependentDetails) {
    return this.http.post<EmployeeDependentDetails>(this.baseUrl + '/update', dependentDetails).pipe(map(response => { return response; }));
  }
  delete(id: number) {
    return this.http.delete<EmployeeDependentDetails>(this.baseUrl + '/delete/' + id).pipe(map(response => { return response; }));
  }
}
