import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Company } from './company';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/company/";
  }

  get() {
    return this.http.get<Company>(this.baseUrl + 'get').pipe(map(response => { return response; }));
  }

  update(company: Company) {
    return this.http.post<Company>(this.baseUrl + 'update', company).pipe(map(response => { return response; }));
  }  
}
