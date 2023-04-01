import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeAddress } from './employee-address.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAddressService {

  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/address";
  }

  get(id:number) {
    return this.http.get<EmployeeAddress[]>(this.baseUrl + '/GetAllByEmployeeId/' + id).pipe(map(response => { return response; }));
  }
  update(address) {
    if (address.id) {
      return this.http.post(this.baseUrl + '/update', address).pipe(map(response => { return response; }));
    } else {
      return this.http.post(this.baseUrl + '/insert', address).pipe(map(response => { return response; }));
    }
  }
}
