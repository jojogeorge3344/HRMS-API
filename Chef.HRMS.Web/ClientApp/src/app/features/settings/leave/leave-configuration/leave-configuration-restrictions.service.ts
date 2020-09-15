import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveConfigurationRestrictions } from './leave-configuration-restrictions.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveConfigurationRestrictionsService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/leave/leavecomponentrestrictionsettings/";
  }

  get(leaveStructureId: number, leaveComponentId: number) {
    return this.http.get<LeaveConfigurationRestrictions>(this.baseUrl + 'get/leaveStructureId/' + leaveStructureId + '/leaveComponentId/' + leaveComponentId).pipe(map(response => { return response; }));
  }

  update(leaveConfigurationRestrictions: LeaveConfigurationRestrictions) {
    return this.http.post<LeaveConfigurationRestrictions>(this.baseUrl + 'update', leaveConfigurationRestrictions).pipe(map(response => { return response; }));
  }

  delete(leaveStructureId: number, leaveComponentId: number) {
    return this.http.delete<LeaveConfigurationRestrictions>(this.baseUrl + 'delete/leaveStructureId/' + leaveStructureId + '/leaveComponentId/' + leaveComponentId).pipe(map(response => { return response; }));
  }
}