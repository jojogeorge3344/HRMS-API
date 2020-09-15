import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentType } from '../../../models/common/types/departmenttype';
import { TeamAttendanceService } from '../team-attendance.service';
import { LeaveComponentService } from '@settings/leave/leave-component/leave-component.service'
import { TeamLeaveLog } from '../team-leave-log.model';
import { LeaveComponent } from '@settings/leave/leave-component/leave-component.model';
import { NgbActiveModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-team-leave-log',
  templateUrl: './team-leave-log.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }]

})
export class TeamLeaveLogComponent implements OnInit {

  fromDateFilter = null;
  toDateFilter = null;
  departmentType = DepartmentType;
  departmentKeys: number[];
  totalCount = 0;
  WFHCount:number;
  regularCount:number;;
  onDutyCount:number;;
  remoteCount:number;;
  leaveLogs:TeamLeaveLog[]=[];
  leaveLogsOnDisplay:TeamLeaveLog[]=[];
  leaveTypes: any; //LeaveComponent[];
  onLeaveToday= 0
  leaveFilter = null;
  departmentFilter = null;
  nameFilter = null;
  fromDate: string;
  toDate: string;
  
  constructor(private teamAttendanceService: TeamAttendanceService,
    private leaveComponentService: LeaveComponentService) {
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
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.getLeaveHistory()
  }
  getLeaveHistory() {
    forkJoin(this.teamAttendanceService.getLeaveLog(this.fromDate,this.toDate), this.leaveComponentService.getAll())
      .subscribe(([leaves, leaveTypes]) => {
        this.leaveLogs = this.leaveLogsOnDisplay = leaves
        if(leaves.length)
          this.onLeaveToday = leaves[0].onLeaveToday
        this.leaveTypes = leaveTypes;
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

    this.teamAttendanceService.getLeaveLog(this.fromDate,this.toDate).subscribe(result =>{
      this.leaveLogs = this.leaveLogsOnDisplay = result;
    });
  }

  filterLog() {
    let date: NgbDate;
    if (!this.leaveFilter && !this.nameFilter && !this.departmentFilter) {
      this.leaveLogsOnDisplay = this.leaveLogs;
      return;
    }
    this.leaveLogsOnDisplay = this.leaveLogs.filter(element => {
      return ((!this.leaveFilter || this.leaveFilter == "null" || element.leaveTypeId == this.leaveFilter) &&
        (!this.departmentFilter || this.departmentFilter == "null" || element.department == this.departmentFilter) &&
        (!this.nameFilter || element.employeeName.toLowerCase().startsWith(this.nameFilter.toLowerCase())))
    })
  }
}
