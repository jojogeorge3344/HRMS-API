import { NavComponent } from '@shared/navigation/nav/nav.component';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeeAttendanceService } from '../employee-attendance.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeAttendanceLog } from '../employee-attendance-log.model';
import { CalendarOptions } from '@fullcalendar/angular';
import { EmployeeJobFilingService } from '@features/employee/employee-job-filing/employee-job-filing.service';
import { HolidayService } from '@settings/holiday/holiday.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { Shift } from '@settings/attendance/shift/shift.model';

@Component({
  templateUrl: './employee-attendance-container.component.html'
})
export class EmployeeAttendanceContainerComponent implements OnInit {
  fromDate: string;
  toDate: string;
  currentUserId: number;
  userAttendanceLog: EmployeeAttendanceLog[] = [];
  userAttendanceLogDisplay = [];
  flag: boolean;
  weekOffTypes = WeekOff;
  employeeShifts: Shift;
  employeeHolidays: string[] = [];
  weekendPolicy: number[] = [];
 
  constructor(
    private toastr: ToastrService,
    private employeeAttendanceService: EmployeeAttendanceService,
    private employeeJobFilingService: EmployeeJobFilingService,
    private holidayService: HolidayService,
    private shiftService: ShiftService,
  ) { 
    let fromDate = new Date();
    let toDate = new Date(fromDate.getFullYear(),fromDate.getMonth() + 1,0);
    const fromDateNew = fromDate.setDate(1);
    fromDate = new Date(fromDateNew);
    this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();
    this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
   
    this.getAttendanceLog();
    this.getWeekendPolicyById();
    this.getAllHolidayByEmployeeId();
    this.getAllShiftByEmployeeId();
   
  }
 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      // backgroundColor: 'yellow'

    ],
  };
  getAttendanceLog() {
    this.employeeAttendanceService.getattendanceLog(this.currentUserId, this.fromDate, this.toDate).subscribe((result) => {
      this.userAttendanceLog = result;
      const events = result.map((a, i) => {
        return {
          title: a.attendanceType,
          color: this.colorEvents(a.attendanceType),
          date: a.date.substring(0, 10)
        };
      });
      this.calendarOptions = {
        ...this.calendarOptions,
        events
      };
      this.userAttendanceLogDisplay = this.userAttendanceLog;
    },
      error => {
        console.error(error);
        this.toastr.error('Unable to fetch the Attendance Log Details', 'Error Message');
      });
  }
  onSubmitWfh(updatewfhcalender) {
    console.log("flag",updatewfhcalender);
    this.flag = updatewfhcalender;
    if (this.flag == true) {
      console.log(this.flag)
      this.getAttendanceLog();
      this.getWeekendPolicyById();
      this.getAllHolidayByEmployeeId();
      this.getAllShiftByEmployeeId();
    }
  }
  colorEvents(attendanceType) {
    switch (attendanceType) {
      case 'Leave':
        return 'blueviolet';
        break;
      case 'Week Off':
        return 'blue';
        break;
      case 'Holiday':
        return 'green';
        break;
      case 'WFH':
        return 'darkcyan';
        break;
      case 'On Duty':
        return 'chocolate';
        break;
      default:
        break;
    }
  }

  getWeekendPolicyById() {
    this.employeeJobFilingService.getWeekendPolicyById(this.currentUserId).subscribe(result => {
      if (result == this.weekOffTypes['SaturdaysAndSundays']) {
        this.weekendPolicy = [0, 6];
      }
      else if (result == this.weekOffTypes['Sundays']) {
        this.weekendPolicy = [0];
      }
      else if (result == this.weekOffTypes['FridaysAndSaturdays']) {
        this.weekendPolicy = [5, 6];
      }
    },
      error => {
        console.error(error);
      });
  }

  getAllHolidayByEmployeeId() {
    this.holidayService.getAllHolidaysByEmployeeId(this.currentUserId).subscribe(result => {
      this.employeeHolidays = result;
    },
      error => {
        console.error(error);
      });
  }

  getAllShiftByEmployeeId() {
    this.shiftService.getShiftByEmployeeId(this.currentUserId).subscribe(result => {
      this.employeeShifts = result;
    },
      error => {
        console.error(error);
      });
  }


}
