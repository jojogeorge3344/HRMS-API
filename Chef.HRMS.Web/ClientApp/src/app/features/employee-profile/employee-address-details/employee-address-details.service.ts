import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeAddressDetails } from "./employee-address-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAddressDetailsService {

  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/address";
  }

  get(id) {
    return this.http.get<EmployeeAddressDetails[]>(this.baseUrl + '/GetAllByEmployeeId/' + id).pipe(map(response => { return response; }));
  }
  update(address) {
    if (address.id) {
      return this.http.post(this.baseUrl + '/update', address).pipe(map(response => { return response; }));
    } else {
      return this.http.post(this.baseUrl + '/insert', address).pipe(map(response => { return response; }));
    }
  }
}
