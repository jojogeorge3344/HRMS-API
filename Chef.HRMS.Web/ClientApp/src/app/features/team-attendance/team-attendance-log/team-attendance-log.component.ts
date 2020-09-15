import { Component, OnInit } from '@angular/core';
import { TeamAttendanceService } from '../team-attendance.service';
import { DepartmentType } from '../../../models/common/types/departmenttype';
import { forkJoin } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { TeamAttendanceLog } from '../team-attendance-log.model';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-team-attendance-log',
  templateUrl: './team-attendance-log.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class TeamAttendanceLogComponent implements OnInit {

  fromDateFilter = null;
  toDateFilter = null;
  departmentType = DepartmentType;
  departmentKeys: number[];
  totalCount = 0;
  WFHCount:number;
  regularCount:number;;
  onDutyCount:number;;
  remoteCount:number;;
  attendanceLogOnDisplay:TeamAttendanceLog[]=[];
  attendanceLog:TeamAttendanceLog[]=[];
  attendenceFilter = null;
  departmentFilter = null;
  nameFilter = null;
  fromDate: string;
  toDate: string;

  constructor(private teamAttendanceService: TeamAttendanceService) { 
    var toDate = new Date();
    var fromDate = new Date()
    const fromDateNew =fromDate.setDate(toDate.getDate() -7);
    fromDate = new Date (fromDateNew)
    this.toDate =toDate.getFullYear() + "-" + (toDate.getMonth() + 1) + "-" + toDate.getDate();
    this.toDateFilter = toDate
    this.fromDate =fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate() ;
    this.fromDateFilter=fromDate 
  }

  ngOnInit(): void {
    this.getTodaysStats()
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number); 
  }

  getTodaysStats() {
    forkJoin(this.teamAttendanceService.getTodaysAttendance(), this.teamAttendanceService.getattendanceLog(this.fromDate,this.toDate))
      .subscribe(([attendanceStats, attendanceLogs]) => {
        attendanceStats.forEach(stat => {
          if (stat.attendanceType == "WFH")
            this.WFHCount = stat.count
          if (stat.attendanceType == "Regular")
            this.regularCount = stat.count
          if (stat.attendanceType == "Remote")
            this.remoteCount = stat.count
          if (stat.attendanceType == "On Duty")
            this.onDutyCount = stat.count
          this.totalCount = this.totalCount + stat.count;
        })
        this.attendanceLog = this.attendanceLogOnDisplay = attendanceLogs;
      })
  }
  getDate(date) {
    let d = new Date(date)
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
  }

  filterbyDate(){
    console.log(this.toDateFilter,this.fromDateFilter)
    var toDate = new Date();
    var fromDate = new Date()
    fromDate = new Date (this.fromDateFilter);
    this.fromDate =fromDate.getFullYear() + "-" + (fromDate.getMonth() + 1) + "-" + fromDate.getDate() ;
    toDate = new Date (this.toDateFilter);
    this.toDate =toDate.getFullYear() + "-" + (toDate.getMonth() + 1) + "-" + toDate.getDate();
    this.teamAttendanceService.getattendanceLog(this.fromDate,this.toDate).subscribe(result =>{
      this.attendanceLog = this.attendanceLogOnDisplay = result;
    });
  }

  filterLog() {
    if (!this.attendenceFilter && !this.nameFilter && !this.departmentFilter) {
      this.attendanceLogOnDisplay = this.attendanceLog;
      return;
    }
    this.attendanceLogOnDisplay = this.attendanceLog.filter(element => {
      return ((!this.attendenceFilter || this.attendenceFilter == "null" || element.attendanceType == this.attendenceFilter) &&
        (!this.departmentFilter || this.departmentFilter == "null" || element.department == this.departmentFilter) &&
        (!this.nameFilter || element.employeeName.toLowerCase().startsWith(this.nameFilter.toLowerCase())))
    })
  }

}
