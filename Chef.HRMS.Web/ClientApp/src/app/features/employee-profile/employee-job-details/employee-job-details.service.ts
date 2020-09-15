import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmployeeJobDetails } from "./employee-job-details.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJobDetailsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/myprofile";
  }

  get(userId) {
    return this.http.get<EmployeeJobDetails>([this.baseUrl, 'getMyProfileDetails', userId].join('/')).pipe(map(response => { return response; }));
  }

}
