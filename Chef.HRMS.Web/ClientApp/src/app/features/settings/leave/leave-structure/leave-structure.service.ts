import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveStructure } from './leave-structure.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaveStructureService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/leave/leaveStructure/";
  }

  getAll() {
    return this.http.get<LeaveStructure[]>(this.baseUrl + 'getAll').pipe(map(response => { return response; }));
  }

  getAssignedLeaveStructures() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedLeaveStructure').pipe(map(response => { return response; }));
  }

  getConfiguredLeaveStructures() {
    return this.http.get<LeaveStructure[]>(this.baseUrl + 'getAllConfiguredLeaveStructures').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<LeaveStructure>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(leaveStructure: LeaveStructure) {
    return this.http.post<LeaveStructure>(this.baseUrl + 'insert', leaveStructure).pipe(map(response => { return response; }));
  }

  update(leaveStructure: LeaveStructure) {
    return this.http.post(this.baseUrl + 'update', leaveStructure).pipe(map(response => { return response; }));
  }

  updateLeaveStructure(leaveStructureId: number, isConfigured: boolean) {
    return this.http.put(this.baseUrl + 'updateLeaveStructure/' + leaveStructureId + '/' + isConfigured, null).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete<LeaveStructure>(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}