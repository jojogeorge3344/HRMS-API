import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeExperienceDetails } from "./employee-experience-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeExperienceDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/previousemployment/";
  }

  get(employeeId: number) {
    return this.http.get<EmployeeExperienceDetails>(this.baseUrl + 'getByEmployeeId/' + employeeId).pipe(map(response => { return response; }));
  }
  
  add(preiousEmployment: EmployeeExperienceDetails) {
    return this.http.post<EmployeeExperienceDetails>(this.baseUrl + 'insert', preiousEmployment).pipe(map(response => { return response; }));
  }

  update(preiousEmployment: EmployeeExperienceDetails) {
    return this.http.post<EmployeeExperienceDetails>(this.baseUrl + 'update', preiousEmployment).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeExperienceDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}