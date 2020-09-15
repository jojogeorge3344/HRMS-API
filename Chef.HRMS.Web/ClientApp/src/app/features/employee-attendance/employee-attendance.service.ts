import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EmployeeAttendanceLog } from "./employee-attendance-log.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeAttendanceService {

  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/attendance/RegularLogin/";
  }
  getDiff(attendance) {
    attendance.forEach(element => {
      var d1:any = new Date(element.clockIn);
      var d2:any = new Date(element.clockOut);
      var diff = d2 - d1;
      var msec = diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      element.workingHours= `${hh}hr ${mm}m`
    });
    return attendance;
  }

  getUserAttendance(id,type) {
    return this.http.get<EmployeeAttendanceLog>(this.baseUrl + 'GetAttendanceLog/' + id + '/' + type).pipe(map(response => { return response; }));;
  }

  getattendanceLog(id,fromDate,toDate) {
    return this.http.get<EmployeeAttendanceLog[]>(this.baseUrl + 'GetAttendanceLog/' + id + '/' + fromDate + '/' + toDate).pipe(
      map(attenendance => { return this.getDiff(attenendance) })
    )
  }

}
