import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeContactDetails } from "./employee-contact-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeContactDetailsService {

  public baseUrl: string;
  public http: HttpClient;
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/profile/contact";
   }

  getAll(id) {
    return this.http.get<EmployeeContactDetails[]>(this.baseUrl + '/GetAllByEmployeeId/' + id).pipe(map(response => { return response; }));
  }
  
  update(contact) {
    if (contact.id){
      return this.http.post(this.baseUrl + '/update',contact).pipe(map(response => { return response; }));
    } else {
      return this.http.post(this.baseUrl + '/insert',contact).pipe(map(response => { return response; }));
    }
  }
}
