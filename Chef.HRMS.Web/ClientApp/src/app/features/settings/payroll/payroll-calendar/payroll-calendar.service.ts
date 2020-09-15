import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayrollCalendar } from './payroll-calendar.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayrollCalendarService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/settings/payroll/payrollcalendar/";
  }

  getAll() {
    return this.http.get<PayrollCalendar[]>(this.baseUrl + 'getAll/').pipe(map(response => { return response; }));
  }

  getAllAssignedPayrollCalendars() {
    return this.http.get<number[]>(this.baseUrl + 'getAllAssignedPayCalendar').pipe(map(response => { return response; }));
  }

  get(id: number) {
    return this.http.get<PayrollCalendar>(this.baseUrl + 'get/' + id).pipe(map(response => { return response; }));
  }

  add(payrollCalendar:PayrollCalendar) {
    return this.http.post(this.baseUrl + 'insert', payrollCalendar).pipe(map(response => { return response; }));
  }

  update(payrollCalendar:PayrollCalendar) {
    return this.http.put<number>(this.baseUrl + 'update', payrollCalendar).pipe(map(response => { return response; }));
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + 'delete/' + id).pipe(map(response => { return response; }));
  }
}
