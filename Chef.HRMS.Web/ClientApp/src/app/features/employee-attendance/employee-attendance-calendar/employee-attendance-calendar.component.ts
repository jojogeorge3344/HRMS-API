import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { EmployeeAttendanceService } from '../employee-attendance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Months } from 'src/app/models/common/types/months';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeAttendanceLog } from '../employee-attendance-log.model';
import { EmployeeJobFilingService } from '../../employee/employee-job-filing/employee-job-filing.service';
import { HolidayService } from '@settings/holiday/holiday.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { Shift } from '@settings/attendance/shift/shift.model';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-attendance-calendar',
  templateUrl: './employee-attendance-calendar.component.html',
  styleUrls: ['./employee-attendance-calendar.component.scss']
})
export class EmployeeAttendanceCalendarComponent implements OnInit {

  constructor(
    private employeeAttendanceService: EmployeeAttendanceService,
    private employeeJobFilingService: EmployeeJobFilingService,
    private holidayService: HolidayService,
    private shiftService: ShiftService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal
  ) {
    const toDate = new Date();
    let fromDate = new Date();
    const fromDateNew = fromDate.setDate(toDate.getDate() - 14);
    fromDate = new Date(fromDateNew);
    this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();
    this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
  }
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  fromDate: string;
  toDate: string;
  currentUserId: number;
  months = Months;
  previousMonths = [];
  weekendPolicy: number[] = [];
  weekOffTypes = WeekOff;
  employeeShifts: Shift;
  employeeHolidays: string[] = [];
  userAttendanceLogDisplay = [];
  userAttendanceLog: EmployeeAttendanceLog[] = [];
  dailyLog: string[];
  currentDate = new Date();
  rangeLogData = {
    Leave: [],
    WFH: [],
    'On Duty': []
  };
  shiftStartTime: string;
  shiftEndTime: string;
  shiftDuration: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      // backgroundColor: 'yellow'

    ],
  };

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getAttendanceLog();
    this.getWeekendPolicyById();
    this.getAllHolidayByEmployeeId();
    this.getAllShiftByEmployeeId();
  }

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
        this.toastr.showErrorMessage('Unable to fetch the Attendance Log Details');
      });
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
      if (result == this.weekOffTypes.SaturdaysAndSundays) {
        this.weekendPolicy = [0, 6];
      } else if (result == this.weekOffTypes['Sundays']) {
        this.weekendPolicy = [0];
      } else if (result == this.weekOffTypes['FridaysAndSaturdays']) {
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
