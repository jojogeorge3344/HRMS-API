import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LeaveComponent } from './leave-component.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaveEligiblityService {
    public baseUrl: string;
    public http: HttpClient;
  
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.http = http;
      this.baseUrl = baseUrl + "api/LeaveEligibility/";
    }
    add(leaveComponent) {
        return this.http.post<LeaveComponent>(this.baseUrl + 'insert/', leaveComponent).pipe(map(response => { return response; }));
      }
      get(id) {
        return this.http.get<LeaveComponent>(this.baseUrl + 'GetLeaveConfiguration/' + id).pipe(map(response => { return response; }));
      }
      update(leaveComponent) {
        return this.http.post<LeaveComponent>(this.baseUrl + 'update/', leaveComponent).pipe(map(response => { return response; }));
      }
      getBenefitType() {
        return this.http.get<LeaveComponent>(this.baseUrl + 'getBenefitType').pipe(map(response => { return response; }));
      }
}