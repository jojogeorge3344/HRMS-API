import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveConfiguration } from './leave-configuration.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveConfigurationService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/leave/leavestructureleavecomponent/";
  }

  getAll(leaveStructureId: number) {
    return this.http.get<LeaveConfiguration[]>(this.baseUrl + 'getAll/' + leaveStructureId).pipe(map(response => { return response; }));
  }

  add(leaveStructureId: number, leaveConfigurations: LeaveConfiguration[], removeLeaveStructureLeaveComponents: LeaveConfiguration[]) {
    return this.http.post(this.baseUrl + 'insert/', { leaveStructureId: leaveStructureId, leaveStructureLeaveComponents: leaveConfigurations, removeLeaveStructureLeaveComponents: removeLeaveStructureLeaveComponents }).pipe(map(response => { return response; }));
  }

  update(leaveStructureId: number, leaveConfigurations: LeaveConfiguration[]) {
    return this.http.post(this.baseUrl + 'update/', { leaveStructureId: leaveStructureId, leaveConfigurations: leaveConfigurations }).pipe(map(response => { return response; }));
  }

  delete(leaveConfiguration: LeaveConfiguration) {
    return this.http.post(this.baseUrl + 'delete/', leaveConfiguration).pipe(map(response => { return response; }));
  }
}