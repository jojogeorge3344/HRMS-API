import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoanSettings } from './loan-settings.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoanSettingsService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http : HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/loanSetting/";
   }

  get(){
    return this.http.get<LoanSettings>(this.baseUrl + 'get').pipe(map(response => { return response; }));
  }

  getLoanSettingId() {
    return this.http.get<number>(this.baseUrl + 'getLoanSettingId').pipe(map(response => { return response; }));
  }

  insert(loanSettings: LoanSettings){
    return this.http.post<LoanSettings>(this.baseUrl + 'insert', loanSettings).pipe(map(response => { return response; }));
  }

  update(loanSettings: LoanSettings){
    return this.http.post<number>(this.baseUrl + 'update', loanSettings).pipe(map(response => { return response; }));
  }
}
