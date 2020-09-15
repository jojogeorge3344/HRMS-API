import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '@features/reports/report.service';
import { ExcelService } from '@features/reports/excel.service';
import { ProcessedSalaryReport } from '../processed-salary-reports.model';
import { DecimalPipe } from '@angular/common';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-processed-salary-report',
  templateUrl: './processed-salary-report.component.html',
  styleUrls: ['./processed-salary-report.component.scss']
})
export class ProcessedSalaryReportComponent implements OnInit {

  processedSalaryReport: ProcessedSalaryReport[] = [];
  processedSalaryReportOnDisplay: ProcessedSalaryReport[] = [];
  excel = [];
  offset = 0;
  employeeCodeFilter = null;
  employeeNameFilter = null;
  payGroupFilter = null;
  dojFilter = null;
  monthFilter = null;
  yearFilter = null;
  page = 1;
  pageSize = 10;
  years: any[] = [];
  months = Months;
  monthKeys: number[];

  constructor(
    private reportsService: ReportsService,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private excelService: ExcelService,
    private decimalPipe: DecimalPipe
  ) {
  }

  ngOnInit(): void {
    this.monthKeys = Object.keys(this.months).filter(Number).map(Number);
    this.getProcessedSalaryReport();
  }

  getProcessedSalaryReport() {
    this.reportsService.getProcessedSalaryDetailsList(this.offset).subscribe((result: any) => {
      this.years = [...this.years, ...result.map(processedSalary =>
        processedSalary.payrollYear
      )];
      this.years = Array.from(new Set(this.years));
      this.processedSalaryReport = [...this.processedSalaryReport, ...result];
      this.processedSalaryReportOnDisplay = [...this.processedSalaryReportOnDisplay, ...result];
      this.offset = this.offset + 10;
      if (result.length) {
        this.getProcessedSalaryReport();
      }
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Processed Salary Report');
      });
  }

  exportAsXLSX(): void {
    const toExport = this.processedSalaryReportOnDisplay
      .map(({ payrollYear, employeeId, createdDate, modifiedDate, createdBy, modifiedBy, isArchived, id, ...res }) => {
        return {
          ...res,
          payrollMonth: `${this.months[parseInt(res.payrollMonth, 10)]}, ${payrollYear}`,
          basicComponent: this.decimalPipe.transform(res.basicComponent),
          lopDeduction: this.decimalPipe.transform(res.lopDeduction),
          loanOrAdvance: this.decimalPipe.transform(res.loanOrAdvance),
          adhocDeduction: this.decimalPipe.transform(res.adhocDeduction),
          loanRepayment: this.decimalPipe.transform(res.loanRepayment),
          total: this.decimalPipe.transform(res.total),

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
    if (!this.employeeCodeFilter && !this.employeeNameFilter && !this.payGroupFilter && !this.yearFilter && !this.monthFilter) {
      this.processedSalaryReportOnDisplay = this.processedSalaryReport;
      return;
    }
    if (this.dojFilter && typeof this.dojFilter == 'object') {
      date = new NgbDate(this.dojFilter.year, this.dojFilter.month, this.dojFilter.day);
    }
    this.processedSalaryReportOnDisplay = this.processedSalaryReport.filter(element => {
      return (
        (!this.employeeCodeFilter || element.employeeCode.toLowerCase().startsWith(this.employeeCodeFilter.toLowerCase())) &&
        (!this.employeeNameFilter || element.employeeName.toLowerCase().startsWith(this.employeeNameFilter.toLowerCase()))
        && (!this.payGroupFilter || element.payGroup.toLowerCase().startsWith(this.payGroupFilter.toLowerCase()))
        && (!this.monthFilter || parseInt(element.payrollMonth, 10) === this.monthFilter)
        && (!this.yearFilter || element.payrollYear === this.yearFilter)

      );
    });
  }


}
