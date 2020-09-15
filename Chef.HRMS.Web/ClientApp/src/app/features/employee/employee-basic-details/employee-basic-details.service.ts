import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeBasicDetails } from "./employee-basic-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBasicDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/employee/";
  }

  add(basicDetails: EmployeeBasicDetails) {
    return this.http.post<EmployeeBasicDetails>(this.baseUrl + 'insert', basicDetails).pipe(map(response => { return response; }));
  }
  getAll() {
    return this.http.get<EmployeeBasicDetails>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }
  update(basicDetails: EmployeeBasicDetails) {
    return this.http.post<EmployeeBasicDetails>(this.baseUrl + 'update', basicDetails).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeBasicDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<EmployeeBasicDetails>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
}

