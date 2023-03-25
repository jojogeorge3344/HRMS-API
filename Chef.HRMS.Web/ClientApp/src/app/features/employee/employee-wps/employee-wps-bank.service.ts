import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { WpsUser } from './wps-user.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeWpsBankerService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/BankMaster/`;
  }


  getBank() {
    return this.http.get<any>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }
  
  add(wps: WpsUser) {
    return this.http.post(this.baseUrl + 'insert', wps).pipe(map(response => { return response; }));
  }
}
