import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentType } from 'src/app/models/common/types/departmenttype';
import { Branch } from '@settings/branch/branch';
import { WorkerType } from 'src/app/models/common/types/workertype';
import { TimeType } from 'src/app/models/common/types/timetype';
import { GenderType } from 'src/app/models/common/types/gendertype';
import { WeekOff } from 'src/app/models/common/types/weekoff';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '@features/reports/report.service';
import { ExcelService } from '@features/reports/excel.service';
import { EmployeeListReport } from '../employee-list-reports.model';
import { SplitByUpperCasePipe } from 'src/app/pipes/split-by-upper-case.pipe';
import { DatePipe } from '@angular/common';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DateformaterService } from "@shared/services/dateformater.service";
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hrms-employee-list-report',
  templateUrl: './employee-list-report.component.html',
  styleUrls: ['./employee-list-report.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    {provide: NgbDateParserFormatter, useClass: DateformaterService}],
})
export class EmployeeListReportComponent implements OnInit {

  employeesReport: EmployeeListReport[] = [];
  employeeReportsOnDisplay: EmployeeListReport[] = [];
  branches: Branch[] = [];
  excel = [];
  offset = 0;
  employeeCodeFilter = null;
  employeeNameFilter = null;
  departmentFilter = null;
  dojFilter = null;
  departmentType = DepartmentType;
  departmentKeys: number[];
  workerTypeKeys: number[];
  workerType = WorkerType;
  timeTypeKeys: number[];
  timeType = TimeType;
  genderTypeKeys: number[];
  genderType = GenderType;
  weekOffTypeKeys: number[];
  weekOffType = WeekOff;
  page = 1;
  pageSize = 10;

  constructor(
    private reportsService: ReportsService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private excelService: ExcelService,
    private splitByUpperCasePipe: SplitByUpperCasePipe,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit(): void {
    this.getEmployeeReport();
    this.departmentKeys = Object.keys(this.departmentType).filter(Number).map(Number);
    this.workerTypeKeys = Object.keys(this.workerType).filter(Number).map(Number);
    this.timeTypeKeys = Object.keys(this.timeType).filter(Number).map(Number);
    this.genderTypeKeys = Object.keys(this.genderType).filter(Number).map(Number);
    this.weekOffTypeKeys = Object.keys(this.weekOffType).filter(Number).map(Number);
  }

  getEmployeeReport() {
    this.reportsService.getEmployeeList(this.offset).subscribe(result => {
      this.employeesReport = [...this.employeesReport, ...result];
      this.employeeReportsOnDisplay = [...this.employeeReportsOnDisplay, ...result];
      this.offset = this.offset + 10;
      if (result.length) {
        this.getEmployeeReport();
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Report');
      });
  }

  exportAsXLSX(): void {
    let toExport: any[] = this.employeeReportsOnDisplay
      .map(({ createdDate, modifiedDate, createdBy, modifiedBy, isArchived, id, ...res }) => res);
    toExport = toExport.map(res => {
      return {
        ...res,
        dateOfJoin: this.datePipe.transform(res.dateOfJoin),
        dateOfBirth: this.datePipe.transform(res.dateOfBirth),
        department: this.splitByUpperCasePipe.transform(this.departmentType[res.department]),
        workerType: this.workerType[res.workerType],
        timeType: this.splitByUpperCasePipe.transform(this.timeType[res.timeType]),
        gender: this.genderType[res.gender],
        weekOff: this.splitByUpperCasePipe.transform(this.weekOffType[res.weekOff])
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
    let date: NgbDate;
    if (!this.employeeCodeFilter && !this.employeeNameFilter && !this.departmentFilter && !this.dojFilter) {
      this.employeeReportsOnDisplay = this.employeesReport;
      return;
    }
    if (this.dojFilter && typeof this.dojFilter == 'object') {
      date = new NgbDate(this.dojFilter.year, this.dojFilter.month, this.dojFilter.day);
    }

    this.employeeReportsOnDisplay = this.employeesReport.filter(element => {
      return (
        (!this.employeeCodeFilter || element.employeeNumber.toLowerCase().startsWith(this.employeeCodeFilter.toLowerCase())) &&
        (!this.employeeNameFilter || element.employeeName.toLowerCase().startsWith(this.employeeNameFilter.toLowerCase()))
        && (!this.departmentFilter || this.departmentFilter == 'null' || element.department == this.departmentFilter) &&
        (!this.dojFilter || typeof this.dojFilter != 'object' || (date.after(this.getDate(element.dateOfJoin)) && date.before(this.getDate(element.dateOfJoin)))
          || date.equals(this.getDate(element.dateOfJoin)) || date.equals(this.getDate(element.dateOfJoin)))
      );
    });
  }

}
