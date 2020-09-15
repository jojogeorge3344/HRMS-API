import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TeamAttendanceStats } from './team-attendance-stats.model';
import { TeamAttendanceLog } from './team-attendance-log.model';
import { TeamLeaveLog } from './team-leave-log.model';

@Injectable({
  providedIn: 'root'
})
export class TeamAttendanceService {
  public baseUrl: string;
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl + "api/Attendance/AttendanceAdmin/";
  }
  getDiff(attendance) {
    attendance.forEach(element => {
      var d1: any = new Date(element.clockIn);
      var d2: any = new Date(element.clockOut);
      var diff = d2 - d1;
      var msec = diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      element.workingHours = `${hh}hr ${mm}m`
    });
    return attendance;
  }

  getTodaysAttendance() {
    return this.http.get<TeamAttendanceStats[]>(this.baseUrl + 'GetTodaysAttendanceStats').pipe(map(response => { return response; }));
  }
  getLeaveLog(fromDate, toDate) {
    return this.http.get<TeamLeaveLog[]>(this.baseUrl + 'GetLeaveLogs' + '/' + fromDate + '/' + toDate).pipe(map(response => { return response; }));
  }
  getattendanceLog(fromDate, toDate) {
    return this.http.get<TeamAttendanceLog[]>(this.baseUrl + 'GetAttendanceLogs' + '/' + fromDate + '/' + toDate).pipe(
      map(attenendance => { return this.getDiff(attenendance) })
    )
  }
  getMarkedDates(tableName, userId) {
    return this.http.get<any>(this.baseUrl + 'MarkedDates' + '/' + tableName + '/' + userId)
      .pipe(
        map((res: string[]) => res.join('~!~'))
      );

  }
}
