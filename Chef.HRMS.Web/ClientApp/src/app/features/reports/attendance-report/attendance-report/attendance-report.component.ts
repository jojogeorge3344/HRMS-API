import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { ReportsService } from '@features/reports/report.service';
import { ExcelService } from '@features/reports/excel.service';
import { AttendanceReport } from '../attendance-reports.model';
import { DatePipe } from '@angular/common';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";


@Component({
  selector: 'hrms-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],

})
export class AttendanceReportComponent implements OnInit {

  attendanceReport: AttendanceReport[] = [];
  attendanceReportOnDisplay: AttendanceReport[] = [];
  excel = [];
  offset = 0;
  employeeCodeFilter = null;
  employeeNameFilter = null;
  departmentFilter = null;
  attendenceFilter = null;
  fromDateFilter = null;
  toDateFilter = null;
  departmentType = DepartmentType;
  departmentKeys: number[];
  fromDate: string;
  toDate: string;
  page = 1;
  pageSize = 10;

  constructor(
    private reportsService: ReportsService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    private splitByUpperCasePipe: SplitByUpperCasePipe,

  ) {
    const toDate = new Date();
    let fromDate = new Date();
    const fromDateNew = fromDate.setDate(toDate.getDate() - 30);
    fromDate = new Date(fromDateNew);
    this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();
    this.toDateFilter = toDate;
    this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
    this.fromDateFilter = fromDate;
  }

  ngOnInit(): void {
    this.getEmployeeReport();
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number);
  }
  compareTwoDates() {
    if (new Date(this.toDateFilter) < new Date(this.fromDateFilter)) {
      this.toastr.showErrorMessage("To date can't before from date");

    }
  }
  getEmployeeReport() {
    this.reportsService.getAttendanceListDetailsList(this.fromDate, this.toDate).subscribe(result => {
      if (result.length != 0) {
        result.forEach(element => {
          let intime = new Date(element.inTime);
          let outtime = new Date(element.outTime);
          element.inTime = new Date(intime.getFullYear(), intime.getMonth(), intime.getDate(), intime.getUTCHours(), intime.getUTCMinutes());
          element.outTime = new Date(outtime.getFullYear(), outtime.getMonth(), outtime.getDate(), outtime.getUTCHours(), outtime.getUTCMinutes());
        });
      }
      this.attendanceReport = [...this.attendanceReport, ...result];
      this.attendanceReportOnDisplay = [...this.attendanceReportOnDisplay, ...result];
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Attendance Report');
      });
  }

  exportAsXLSX(): void {
    const toExport = this.attendanceReportOnDisplay
      .map(({ createdDate, modifiedDate, createdBy, modifiedBy, isArchived, id, ...res }) => {
        return {
          ...res,
          department: this.splitByUpperCasePipe.transform(this.departmentType[res.department]),
          date: this.datePipe.transform(res.date),
          inTime: this.datePipe.transform(res.inTime, 'hh:mm a'),
          outTime: this.datePipe.transform(res.outTime, 'hh:mm a'),
        };
      });
    this.excel = [];
    toExport.forEach(row => {
      this.excel.push(row);
    });
    this.excelService.exportAsExcelFile(this.excel, 'Employee_List');
  }

  getDate(date) {
    const d = new Date(date);
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };
  }

  filterbyDate() {
    let toDate = new Date();
    let fromDate = new Date(new Date().setDate(toDate.getDate() - 30));
    if (this.fromDateFilter && this.toDateFilter &&
      typeof this.fromDateFilter === 'object' && typeof this.toDateFilter === 'object') {
      fromDate = new Date(this.fromDateFilter);
      toDate = new Date(this.toDateFilter);


      this.fromDate = fromDate.getFullYear() + '-' + (fromDate.getMonth() + 1) + '-' + fromDate.getDate();
      this.toDate = toDate.getFullYear() + '-' + (toDate.getMonth() + 1) + '-' + toDate.getDate();
      this.reportsService.getAttendanceListDetailsList(this.fromDate, this.toDate).subscribe(result => {
        if (result.length != 0) {
          result.forEach(element => {
            let intime = new Date(element.inTime);
            let outtime = new Date(element.outTime);
            element.inTime = new Date(intime.getFullYear(), intime.getMonth(), intime.getDate(), intime.getUTCHours(), intime.getUTCMinutes());
            element.outTime = new Date(outtime.getFullYear(), outtime.getMonth(), outtime.getDate(), outtime.getUTCHours(), outtime.getUTCMinutes());
          });
        }
        this.attendanceReport = this.attendanceReportOnDisplay = result;
      });
    }

  }

  filterLog() {
    if (!this.employeeCodeFilter && !this.employeeNameFilter && !this.departmentFilter && !this.attendenceFilter) {
      this.attendanceReportOnDisplay = this.attendanceReport;
      return;
    }

    this.attendanceReportOnDisplay = this.attendanceReport.filter(element => {
      return (
        (!this.attendenceFilter || this.attendenceFilter == 'null' || element.attendanceType == this.attendenceFilter) &&
        (!this.employeeCodeFilter || element.employeeNumber.toLowerCase().startsWith(this.employeeCodeFilter.toLowerCase())) &&
        (!this.employeeNameFilter || element.employeeName.toLowerCase().startsWith(this.employeeNameFilter.toLowerCase()))
        && (!this.departmentFilter || this.departmentFilter == 'null' || element.department == this.departmentFilter)
      );
    });
  }
}
