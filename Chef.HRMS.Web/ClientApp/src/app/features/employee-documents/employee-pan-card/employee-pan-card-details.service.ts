import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeePANCardDetails } from "./employee-pan-card-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeePANCardDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/pan/";
  }

  get(empId) {
    return this.http.get<EmployeePANCardDetails>(this.baseUrl + 'getByEmployeeId/' + empId).pipe(map(response => { return response; }));
  }
  
  add(panCard: EmployeePANCardDetails) {
    return this.http.post<EmployeePANCardDetails>(this.baseUrl + 'insert', panCard).pipe(map(response => { return response; }));
  }

  update(panCard: EmployeePANCardDetails) {
    return this.http.post<EmployeePANCardDetails>(this.baseUrl + 'update', panCard).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeePANCardDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
