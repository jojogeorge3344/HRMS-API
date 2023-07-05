import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

import { ReportsService } from '@features/reports/report.service';
import { ExcelService } from '@features/reports/excel.service';
import { LeaveReport } from '../leave-reports.model';
import { DatePipe } from '@angular/common';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";

@Component({
  selector: 'hrms-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],

})
export class LeaveReportComponent implements OnInit {

  leaveReport: LeaveReport[] = [];
  leaveReportOnDisplay: LeaveReport[] = [];
  excel = [];
  offset = 0;
  employeeCodeFilter = null;
  employeeNameFilter = null;
  departmentFilter = null;
  fromDateFilter = null;
  toDateFilter = null;
  departmentType = DepartmentType;
  departmentKeys: number[];
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
  }

  ngOnInit(): void {
    this.getLeaveReport();
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number);
  }

  getLeaveReport() {
    this.reportsService.getLeaveReportDetailsList(this.offset).subscribe(result => {
      this.leaveReport = [...this.leaveReport, ...result];
      this.leaveReportOnDisplay = [...this.leaveReportOnDisplay, ...result];
      this.offset = this.offset + 10;
      if (result.length) {
        this.getLeaveReport();
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Report');
      });
  }

  exportAsXLSX(): void {
    const toExport = this.leaveReportOnDisplay
      .map(({ employeeId, createdDate, modifiedDate, createdBy, modifiedBy, isArchived, id, ...res }) => {
        return {
          ...res,
          department: this.splitByUpperCasePipe.transform(this.departmentType[res.department]),
          fromDate: this.datePipe.transform(res.fromDate),
          toDate: this.datePipe.transform(res.toDate),
          appliedOn: this.datePipe.transform(res.appliedOn),
          approvedOn: this.datePipe.transform(res.approvedOn)

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

  filterLog() {
    let fromDate: NgbDate;
    let toDate: NgbDate;
    if (!this.employeeCodeFilter && !this.employeeNameFilter && !this.departmentFilter && !this.fromDateFilter && !this.toDateFilter) {
      this.leaveReportOnDisplay = this.leaveReport;
      return;
    }
    if (this.fromDateFilter && typeof this.fromDateFilter === 'object') {
      fromDate = new NgbDate(this.fromDateFilter.getFullYear(), this.fromDateFilter.getMonth() + 1, this.fromDateFilter.getDate());
    }
    if (this.toDateFilter && typeof this.toDateFilter === 'object') {
      toDate = new NgbDate(this.toDateFilter.getFullYear(), this.toDateFilter.getMonth() + 1, this.toDateFilter.getDate());
    }

    this.leaveReportOnDisplay = this.leaveReport.filter(element => {
      return (
        (!this.employeeCodeFilter || element.employeeCode.toLowerCase().startsWith(this.employeeCodeFilter.toLowerCase())) &&
        (!this.employeeNameFilter || element.employeeName.toLowerCase().startsWith(this.employeeNameFilter.toLowerCase()))
        && (!this.departmentFilter || this.departmentFilter == 'null' || element.department == this.departmentFilter)
        &&
        (!this.fromDateFilter || typeof this.fromDateFilter !== 'object' ||
          ((fromDate.before(this.getDate(element.fromDate)) && fromDate.before(this.getDate(element.toDate)))
            || fromDate.equals(this.getDate(element.fromDate)) || fromDate.equals(this.getDate(element.toDate))))
        &&
        (!this.toDateFilter || typeof this.toDateFilter !== 'object' ||
          ((toDate.after(this.getDate(element.fromDate)) && toDate.after(this.getDate(element.toDate)))
            || toDate.equals(this.getDate(element.fromDate)) || toDate.equals(this.getDate(element.toDate))))
      );
    });
  }

}
