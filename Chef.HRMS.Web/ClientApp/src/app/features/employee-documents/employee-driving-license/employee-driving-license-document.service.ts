import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeDrivingLicenseDocument } from "./employee-driving-license-document.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDrivingLicenseDocumentService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/drivinglicensedocument/";
  }

  get(id) {
    return this.http.get<EmployeeDrivingLicenseDocument>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }
  
  add(drivingLicenseDocument: EmployeeDrivingLicenseDocument) {
    return this.http.post<EmployeeDrivingLicenseDocument>(this.baseUrl + 'insert', drivingLicenseDocument).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeDrivingLicenseDocument>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
