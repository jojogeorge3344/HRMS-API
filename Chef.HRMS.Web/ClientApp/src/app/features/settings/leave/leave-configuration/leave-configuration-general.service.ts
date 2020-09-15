import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveConfigurationGeneral } from './leave-configuration-general.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveConfigurationGeneralService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/leave/leavecomponentgeneralsettings/";
  }

  get(leaveStructureId: number, leaveComponentId: number) {
    return this.http.get<LeaveConfigurationGeneral>(this.baseUrl + 'get/leaveStructureId/' + leaveStructureId + '/leaveComponentId/' + leaveComponentId).pipe(map(response => { return response; }));
  }

  update(leaveConfigurationGeneral: LeaveConfigurationGeneral) {
    return this.http.post<LeaveConfigurationGeneral>(this.baseUrl + 'update', leaveConfigurationGeneral).pipe(map(response => { return response; }));
  }

  delete(leaveStructureId: number, leaveComponentId: number) {
    return this.http.delete<LeaveConfigurationGeneral>(this.baseUrl + 'delete/leaveStructureId/' + leaveStructureId + '/leaveComponentId/' + leaveComponentId).pipe(map(response => { return response; }));
  }
}