import { Component, OnInit } from '@angular/core';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { EmployeeAttendanceService } from '../employee-attendance.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRequestsContainerComponent } from '../employee-requests-container/employee-requests-container.component';
import { Months } from 'src/app/models/common/types/months';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { EmployeeAttendanceLog } from '../employee-attendance-log.model';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeJobFilingService } from '../../employee/employee-job-filing/employee-job-filing.service';
import { HolidayService } from '@settings/holiday/holiday.service';
import { ShiftService } from '@settings/attendance/shift/shift.service';
import { Shift } from '@settings/attendance/shift/shift.model';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";


@Component({
  selector: 'hrms-employee-attendance-log',
  templateUrl: './employee-attendance-log.component.html',
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],

})
export class EmployeeAttendanceLogComponent implements OnInit {

  fromDateFilter = null;
  toDateFilter = null;
  fromDate: string;
  toDate: string;
  weekendPolicy: number[] = [];
  weekOffTypes = WeekOff;
  employeeShifts: Shift;
  employeeHolidays: string[] = [];
  minDateFrom;
  maxDateFrom;
  minDateTo;
  maxDateTo;
  departmentType = DepartmentType;
  departmentKeys: number[];
  stats: any;
  departmentFilter = null;
  nameFilter = null;
  dateFilter = null;
  currentUserId: number;
  months = Months;
  previousMonths = [];
  userAttendanceLogDisplay = [];
  userAttendanceLog: EmployeeAttendanceLog[] = [];
  attendenceFilter = null;
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
    fromDate = new Date (fromDateNew);
    this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();
    this.toDateFilter = toDate;
    this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate() ;
    this.fromDateFilter = fromDate;
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.setAttendanceFilterCategory();
    this.getWeekendPolicyById();
    this.getAllHolidayByEmployeeId();
    this.getAllShiftByEmployeeId();
    this.attendanceFilter();
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number);
  }

  onFromDateSelection() {
    const fromDate = new Date(this.fromDateFilter);
    const maxDate = new Date(fromDate.setDate(fromDate.getDate() + 14));
    this.maxDateTo = {
      year: maxDate.getFullYear(),
      month: maxDate.getMonth() + 1,
      day: maxDate.getDate()
    };
  }

  onToDateSelection() {
    const toDate = new Date(this.toDateFilter);
    const minDate = new Date(toDate.setDate(toDate.getDate() - 14));
    this.minDateFrom = {
      year: minDate.getFullYear(),
      month: minDate.getMonth() + 1,
      day: minDate.getDate()
    };
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
      this.shiftStartTime = result.startTime;
      this.shiftEndTime = result.endTime;
      this.shiftDuration = this.getDuration(this.shiftStartTime, this.shiftEndTime);
    },
      error => {
        console.error(error);
      });
  }

  getDuration(start, end) {
    const difference = (new Date(end).getTime() - new Date(start).getTime());
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor(((difference % 86400000) % 3600000) / 60000);
    let duration = `${hours} hours`;
    if (minutes !== 0) {
      duration += ` and ${minutes} minutes`;
    }
    return duration;
  }

  setAttendanceFilterCategory() {
    let currentMonth = this.currentDate.getMonth();
    let currentYear = this.currentDate.getFullYear();

    for (let index = 0; index < 4; index++) {
      this.previousMonths.push({month: currentMonth, year: currentYear});
      if (currentMonth <= 1) {
        currentMonth = 12;
        currentYear--;
      } else {
        currentMonth--;
      }
    }
  }

  attendanceFilter() {
    const startDate = new Date(this.toDate);
    const endDate = new Date(this.fromDate);
    this.dailyLog = this.generateDateArray(startDate, endDate);
    this.getAttendanceLog();
  }

  getAttendanceLog() {
    this.employeeAttendanceService.getattendanceLog(this.currentUserId, this.fromDate, this.toDate).subscribe((result) => {
      this.userAttendanceLog = result;
      // this.getRangeData();
      this.userAttendanceLogDisplay = this.userAttendanceLog = this.mapDailyLog();
    },
    error => {
      console.error(error);
      this.toastr.showErrorMessage('Unable to fetch the Attendance Log Details');
    });
  }

  generateDateArray(startDate, endDate) {
    let steps;
    const interval = 1000 * 60 * 60 * 24;
    startDate.setHours(0, 0, 0);
    endDate.setHours(0, 0, 0);
    steps = Math.abs(startDate.getTime() - endDate.getTime()) / interval;
    return Array.from({length: steps + 1}, (v, i) => new Date(startDate.valueOf() - (interval * i)).toString());
  }

  // getRangeData(){
  //   let rangeLogs = this.userAttendanceLog.filter(item=> {
  //     return (item.attendanceType == "WFH" || item.attendanceType == "On Duty" || item.attendanceType == "Leave");
  //   })

  //   rangeLogs.forEach(log => {
  //     let startDate = new Date(log.clockIn);
  //     let endDate = new Date(log.clockOut);

  //     this.rangeLogData[log.attendanceType].push(...this.generateDateArray(endDate, startDate));
  //   });
  // }

  mapDailyLog() {
    return this.dailyLog.map((date) => {
      const dateObj = new Date(date);
      const currentItem = this.userAttendanceLog.find((item) => (new Date(item.date).toString() == date));
      const currentLog: EmployeeAttendanceLog = {
        date,
        attendanceType: null,
        clockIn: this.shiftStartTime,
        clockOut: this.shiftEndTime,
        effectiveHours: this.shiftDuration,
        grossHours: this.shiftDuration,
        isApproved: true,
      };

      if (this.weekendPolicy.includes(dateObj.getDay())) {
        currentLog.attendanceType = 'Week Off';
      } else if (currentItem) {
        if (this.employeeHolidays.includes(currentItem.date)) {
          currentLog.attendanceType = 'Holiday';
        } else {
          currentLog.attendanceType = currentItem.attendanceType;
          currentLog.isApproved = currentItem.isApproved;

          if (currentItem.attendanceType == 'Regular' || currentItem.attendanceType == 'Remote') {
            currentLog.clockIn = currentItem.clockIn;
            currentLog.clockOut = currentItem.clockOut;
            currentLog.effectiveHours = currentItem.effectiveHours;
            currentLog.grossHours = currentItem.grossHours;
          }
        }
      }
      return currentLog;
   });
  }

  filterbyDate() {
    let toDate = new Date();
    let fromDate = new Date();
    fromDate = new Date (this.fromDateFilter);
    this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate() ;
    toDate = new Date (this.toDateFilter);
    this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();

    this.dailyLog = this.generateDateArray(toDate, fromDate);
    this.employeeAttendanceService.getattendanceLog(this.currentUserId, this.fromDate, this.toDate).subscribe((result) => {
      this.userAttendanceLogDisplay = this.userAttendanceLog = this.mapDailyLog();
    });
  }


  filterLog() {
    if (this.attendenceFilter == 'null') {
      this.userAttendanceLogDisplay = this.userAttendanceLog;
    } else {
      this.userAttendanceLogDisplay = this.userAttendanceLog.filter(element => {
        return ((!this.attendenceFilter || element.attendanceType == this.attendenceFilter));
      });
    }
  }

  openRequestLogs() {
    const modalRef = this.modalService.open(EmployeeRequestsContainerComponent,
      { size: 'lg', centered: true, backdrop: 'static' });

    modalRef.componentInstance.requestId = this.currentUserId;

    modalRef.result.then((result) => {
      if (result == 'submit') {
      }
    });
  }
}
