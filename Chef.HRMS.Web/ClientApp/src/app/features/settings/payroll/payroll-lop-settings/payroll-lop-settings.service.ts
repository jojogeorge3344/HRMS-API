import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LopSettings } from './payroll-lop-settings.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollLopSettingsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = `${baseUrl}api/LossOfPay/LOPCalculation/`;
  }

  get(id) {
    return this.http.get<LopSettings>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  getAll() {
    return this.http.get<LopSettings[]>(this.baseUrl + 'GetAll').pipe(map(response => { return response; }));
  }

  add(lopSettings: any) {
    return this.http.post<LopSettings>(this.baseUrl + 'insert', lopSettings).pipe(map(response => { return response; }));
  }
  update(lopSettings: any) {
    return this.http.put<number>(this.baseUrl + 'update', lopSettings).pipe(map(response => { return response; }));
  }
}
