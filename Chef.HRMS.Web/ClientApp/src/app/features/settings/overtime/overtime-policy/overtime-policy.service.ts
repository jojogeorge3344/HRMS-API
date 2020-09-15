import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OvertimePolicy } from './overtime-policy.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OvertimePolicyService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/overtime/overtimePolicy/";
  }

  getAll() {
    return this.http.get<OvertimePolicy[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getAllAssignedOverTimePolicyCount() {
    return this.http.get<OvertimePolicy[]>(this.baseUrl + 'getAllAssignedOverTimePolicyCount/').pipe(map(response => { return response; }));
  }

  getAssignedOvertimePolicies() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedOvertimePolicy').pipe(map(response => { return response; }));
  }

  getConfiguredOvertimePolicies() {
    return this.http.get<OvertimePolicy[]>(this.baseUrl + 'getAllConfiguredOvertimePolicies').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<OvertimePolicy>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(overtimePolicy:OvertimePolicy) {
    return this.http.post(this.baseUrl + 'insert', overtimePolicy).pipe(map(response => { return response; }));
  }

  update(overtimePolicy:OvertimePolicy) {
    return this.http.put<number>(this.baseUrl + 'update', overtimePolicy).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
