import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDrivingLicenseDetails } from "./employee-driving-license-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDrivingLicenseDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/drivinglicense/";
  }

  get(empId) {
    return this.http.get<EmployeeDrivingLicenseDetails>(this.baseUrl + 'getByEmployeeId/' + empId).pipe(map(response => { return response; }));
  }
  
  add(drivingLicense: EmployeeDrivingLicenseDetails) {
    return this.http.post<EmployeeDrivingLicenseDetails>(this.baseUrl + 'insert', drivingLicense).pipe(map(response => { return response; }));
  }

  update(drivingLicense: EmployeeDrivingLicenseDetails) {
    return this.http.post<EmployeeDrivingLicenseDetails>(this.baseUrl + 'update', drivingLicense).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeDrivingLicenseDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
