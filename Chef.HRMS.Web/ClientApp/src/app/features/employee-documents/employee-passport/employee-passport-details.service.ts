import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeePassportDetails } from './employee-passport-details.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeePassportDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/passport/";
  }

  get(empId) {
    return this.http.get<EmployeePassportDetails>(this.baseUrl + 'getByEmployeeId/' + empId).pipe(map(response => { return response; }));
  }
  
  add(passport: EmployeePassportDetails) {
    return this.http.post<EmployeePassportDetails>(this.baseUrl + 'insert', passport).pipe(map(response => { return response; }));
  }

  update(passport: EmployeePassportDetails) {
    return this.http.post<EmployeePassportDetails>(this.baseUrl + 'update', passport).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeePassportDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
