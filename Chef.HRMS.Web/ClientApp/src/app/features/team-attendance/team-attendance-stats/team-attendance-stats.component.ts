import { Component, OnInit } from '@angular/core';
import { TeamAttendanceService } from '../team-attendance.service';

@Component({
  selector: 'hrms-team-attendance-stats',
  templateUrl: './team-attendance-stats.component.html'
})
export class TeamAttendanceStatsComponent implements OnInit {

  totalCount = 0;
  WFHCount:number;
  regularCount:number;;
  onDutyCount:number;;
  remoteCount:number;;
  
  constructor(private teamAttendanceService: TeamAttendanceService) { }

  ngOnInit(): void {
    this.getTodaysStats();
  }

  getTodaysStats() {
    this.teamAttendanceService.getTodaysAttendance().subscribe((attendanceStats) => {
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
        });
    });
  }  
}
