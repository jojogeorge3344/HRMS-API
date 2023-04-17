import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveComponent } from './leave-component.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class LeaveComponentService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/leave/leavecomponent/";
  }

  getAll() {
    return this.http.get<LeaveComponent[]>(this.baseUrl + 'getall').pipe(map(response => { return response; }));
  }

  getAssignedLeaveComponents() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedLeaveComponents').pipe(map(response => { return response; }));
  }

  getAllByLeaveStructure(leaveStructureId) {
    return this.http.get<LeaveComponent[]>(this.baseUrl + 'getallByLeaveStructure/' + leaveStructureId).pipe(map(response => { return response; }));
  }

  get(id) {
    return this.http.get<LeaveComponent>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(leaveComponent) {
    return this.http.post<LeaveComponent>(this.baseUrl + 'insert/', leaveComponent).pipe(map(response => { return response; }));
  }

  update(leaveComponent: LeaveComponent) {
    return this.http.post<LeaveComponent>(this.baseUrl + 'update/', leaveComponent).pipe(map(response => { return response; }));
  }

  delete(id) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
  getbenefitcategory() {
    return this.http.get<number[]>(this.baseUrl + 'GetBenefitCategory').pipe(map(response => { return response; }));

  }
  getbenefittype(id) {
    return this.http.get<LeaveComponent>(this.baseUrl + 'GetBenefitType/' + id).pipe(map(response => { return response; }));
  }
  getAccrualtype() {
    return this.http.get<LeaveComponent>(this.baseUrl + 'GetAccrualType').pipe(map(response => { return response; }));
  }
  getAccrualBenefittype() {
    return this.http.get<LeaveComponent>(this.baseUrl + 'GetAccrualBenefitType').pipe(map(response => { return response; }));
  }
  getDetectiontype() {
    return this.http.get<LeaveComponent>(this.baseUrl + 'GetDeductionType').pipe(map(response => { return response; }));
  }
}