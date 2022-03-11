import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeWFHCreateComponent } from '../employee-wfh/employee-wfh-create/employee-wfh-create.component';
import { EmployeeRemoteLoginCreateComponent } from '../employee-regular-login/employee-remote-login-create/employee-remote-login-create.component';
import { EmployeeWebLoginCreateComponent } from '../employee-regular-login/employee-web-login-create/employee-web-login-create.component';
import { EmployeeOnDutyCreateComponent } from '../employee-on-duty/employee-on-duty-create/employee-on-duty-create.component';
import { EmployeeRegularLoginService } from '../employee-regular-login/employee-regular-login.service';
import { getCurrentUserId } from '@shared/utils/utils.functions';
import { WorkFromHomeSettingsService } from '@settings/attendance/work-from-home-settings/work-from-home-settings.service';
import { WorkFromHomeSettings } from '@settings/attendance/work-from-home-settings/work-from-home-settings.model';
import { TeamAttendanceService } from '@features/team-attendance/team-attendance.service';
import { forkJoin } from 'rxjs';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-attendance-actions',
  templateUrl: './employee-attendance-actions.component.html'
})
export class EmployeeAttendanceActionsComponent implements OnInit, OnDestroy{

  toDate: Date;
  minDate;
  time = new Date();
  isClockedIn = false;
  isRemoteClockedIn = false;
  logTime;
  currentUserId: number;
  isWFHEnabled = false;
  wfhAvailable: number;
  leavesApplied = '';
  wfhApplied = '';
  onDutyApplied = '';
  WFHSettings: WorkFromHomeSettings;
  @Output() updatewfhcalender = new EventEmitter<boolean>();
  constructor(private workFromHomeSettingsService: WorkFromHomeSettingsService,
    public modalService: NgbModal,
    private toastr: ToasterDisplayService,
    private employeeRegularLoginService: EmployeeRegularLoginService,
    private teamAttendanceService: TeamAttendanceService
  ) {
    this.minDate = new Date();
  }

  ngOnDestroy(): void {
    this.modalService.dismissAll()
  }

  ngOnInit(): void {
    this.currentUserId = getCurrentUserId();
    this.getWorkFromHomeSettings();
    this.getMarkedDates('leave', this.currentUserId);
    this.getMarkedDates('onduty', this.currentUserId);

    if (localStorage.getItem('clockIn')) {
      const webCheckIn = JSON.parse(localStorage.getItem('clockIn'));
      webCheckIn.checkInTime = new Date(webCheckIn.checkInTime);
      const currentDate = new Date();
      if (webCheckIn.checkInTime.getDate() == currentDate.getDate() && webCheckIn.checkInTime.getMonth() == currentDate.getMonth()) {
        this.isClockedIn = true;
      } else {
        this.setRemoteClockInOut();
      }
    }
    if (localStorage.getItem('RemoteClockIn')) {
      const remoteCheckIn = JSON.parse(localStorage.getItem('RemoteClockIn'));
      remoteCheckIn.checkInTime = new Date(remoteCheckIn.checkInTime);
      const currentDate = new Date();
      if (remoteCheckIn.checkInTime.getDate() == currentDate.getDate() && remoteCheckIn.checkInTime.getMonth() == currentDate.getMonth()) {
        this.isRemoteClockedIn = true;
      } else {
        this.setRemoteClockInOut();
      }
    }
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
  getMarkedDates(tablename, userId) {
    this.teamAttendanceService.getMarkedDates(tablename, userId)
      .subscribe(res => {
        switch (tablename) {
          case 'leave':
            this.leavesApplied = res;            
            break;
          case 'onduty':
            this.onDutyApplied = res;
            break;
          default:
            break;
        }
      });
  }

  setClockInOut() {
    if (localStorage.getItem('clockIn')) {
      this.isClockedIn = true;
    } else {
      this.isClockedIn = false;
    }
  }

  setRemoteClockInOut() {
    if (localStorage.getItem('RemoteClockIn')) {
      this.isRemoteClockedIn = true;
    } else {
      this.isRemoteClockedIn = false;
    }
  }

  showLogin() {
    const loginTime = JSON.parse(localStorage.getItem('clockIn'));
    const d1: any = new Date(loginTime.checkInTime);
    const d2: any = new Date();
    const diff = d2 - d1;
    let msec = diff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    return `${hh}hr ${mm}m`;
  }

  openWebClockIn() {
    const modalRef = this.modalService.open(EmployeeWebLoginCreateComponent,
      {centered: true, backdrop: 'static' });
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.setClockInOut();
      }
    });
  }

  openWebClockOut() {
    const clockOut = JSON.parse(localStorage.getItem('clockIn'));
    clockOut.checkOutTime = new Date(Date.now());
    this.employeeRegularLoginService.update(clockOut).subscribe(result => {
      localStorage.removeItem('clockIn');
      this.setClockInOut();
      this.toastr.showSuccessMessage('Web Clock "Out" success');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Web Clock "Out"');
      });
  }

  openRemoteClockIn() {
    const modalRef = this.modalService.open(EmployeeRemoteLoginCreateComponent,
      {centered: true, backdrop: 'static' });
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.setRemoteClockInOut();
      }
    });
  }

  openRemoteClockOut() {
    const clockOut = JSON.parse(localStorage.getItem('RemoteClockIn'));
    clockOut.checkOutTime = new Date(Date.now());
    this.employeeRegularLoginService.update(clockOut).subscribe(result => {
      localStorage.removeItem('RemoteClockIn');
      this.setRemoteClockInOut();
      this.toastr.showSuccessMessage('Remote Clock "Out" success');
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to Remote Clock "Out"');
      });
  }

  openWorkFromHome() {
    const modalRef = this.modalService.open(EmployeeWFHCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.leaves = this.leavesApplied;
    modalRef.componentInstance.wfh = this.wfhApplied;
    modalRef.componentInstance.onDuty = this.onDutyApplied;
    modalRef.componentInstance.wfhAvailable = this.wfhAvailable;
    modalRef.componentInstance.WFHSettings = this.WFHSettings;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.updatewfhcalender.emit(true);
      }
    });
  }

  getWorkFromHomeSettings() {
    forkJoin([this.workFromHomeSettingsService.get(), this.teamAttendanceService.getMarkedDates('workfromhome', this.currentUserId)])
      .subscribe((result: [WorkFromHomeSettings, string]) => {
        if (result) {
          this.WFHSettings = result[0];
          this.wfhApplied = result[1];
          this.wfhAvailable = result[0].maximumLimit - this.getWfhAppliedCount();
          this.isWFHEnabled = result[0].isEnabled && this.wfhAvailable > 0;
        }
      });
  }
  getWfhAppliedCount() {
    const d = new Date();
    if (this.WFHSettings.periodType === 1) {
      let startingDate = new Date(d.setDate(d.getDate() - d.getDay() + 1));
      let count = 0;
      for (let index = 0; index < 5; index++) {
        const DateString = `${startingDate.getUTCFullYear()}-${startingDate.getMonth() + 1}-${startingDate.getDate()}`;
        if (this.wfhApplied.indexOf(DateString) !== -1) {
          count++;
        }
        startingDate = new Date(startingDate.setDate(startingDate.getDate() + 1));
      }
      return count;
    } else if (this.WFHSettings.periodType === 2) {
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = (d.getFullYear()).toString();
      const re = new RegExp(`${year}-${month}-`, 'g');
      return (this.wfhApplied.match(re) || []).length;
    } else if (this.WFHSettings.periodType === 3) {
      const year = (d.getFullYear()).toString();
      const re = new RegExp(`${year}-`, 'g');
      return (this.wfhApplied.match(re) || []).length;
    }
  }

  openOnDuty() {
    const modalRef = this.modalService.open(EmployeeOnDutyCreateComponent,
      { size: 'lg', centered: true, backdrop: 'static' });
    modalRef.componentInstance.leaves = this.leavesApplied;
    modalRef.componentInstance.wfh = this.wfhApplied;
    modalRef.componentInstance.onDuty = this.onDutyApplied;
    modalRef.result.then((result) => {
      if (result == 'submit') {
        this.updatewfhcalender.emit(true);
      }
    });
  }

}
