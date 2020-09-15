import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeUIDDetails } from "./employee-uid-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeUIDDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/uniqueidentificationdetail/";
  }

  get(empId) {
    return this.http.get<EmployeeUIDDetails>(this.baseUrl + 'getByEmployeeId/' + empId).pipe(map(response => { return response; }));
  }
  
  add(uniqueIdentificationDetail: EmployeeUIDDetails) {
    return this.http.post<EmployeeUIDDetails>(this.baseUrl + 'insert', uniqueIdentificationDetail).pipe(map(response => { return response; }));
  }

  update(uniqueIdentificationDetail: EmployeeUIDDetails) {
    return this.http.post<EmployeeUIDDetails>(this.baseUrl + 'update', uniqueIdentificationDetail).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<EmployeeUIDDetails>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
