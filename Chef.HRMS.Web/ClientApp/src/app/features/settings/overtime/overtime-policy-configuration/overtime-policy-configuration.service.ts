import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OvertimePolicyConfiguration } from './overtime-policy-configuration.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class OvertimePolicyConfigurationService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/overtime/overtimePolicyConfiguration/";
  }

  get(id) {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(overtimePolicyConfiguration: OvertimePolicyConfiguration) {
    return this.http.post<OvertimePolicyConfiguration>(this.baseUrl + 'insert', overtimePolicyConfiguration).pipe(map(response => { return response; }));
  }

  update(overtimePolicyConfiguration: OvertimePolicyConfiguration) {
    return this.http.put<OvertimePolicyConfiguration>(this.baseUrl + 'update', overtimePolicyConfiguration).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<OvertimePolicyConfiguration>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }

  getByOverTimePolicyId(overtimePolicyId) {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'getByOverTimePolicyId/' + overtimePolicyId).pipe(map(response => { return response; }));
  }

  getOvertimeConfiguration(employeeId) {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'GetOvertimeConfigurationById/' + employeeId).pipe(map(response => { return response; }));
  }
  getNormalOverTime() {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'getNormalOverTime' ).pipe(map(response => { return response; }));
  }
  getHolidayOverTime() {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'getHolidayOverTime' ).pipe(map(response => { return response; }));
  }
  getSpecialOverTime() {
    return this.http.get<OvertimePolicyConfiguration>(this.baseUrl + 'getSpecialOverTime' ).pipe(map(response => { return response; }));
  }
}