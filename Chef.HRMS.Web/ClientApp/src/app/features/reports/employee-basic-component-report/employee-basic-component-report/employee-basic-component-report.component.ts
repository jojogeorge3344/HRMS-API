import { Component, OnInit, } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '@features/reports/report.service';
import { ExcelService } from '@features/reports/excel.service';
import { Months } from 'src/app/models/common/types/months';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-employee-basic-component-report',
  templateUrl: './employee-basic-component-report.component.html',
  styleUrls: ['./employee-basic-component-report.component.scss']
})
export class EmployeeBasicComponentReportComponent implements OnInit {

  employeesBasicList: { id: number, values: any[] }[] = [];
  employeesBasicListOnDisplay: { id: number, values: any[] }[] = [];
  excel = [];
  employeeCodeFilter = null;
  employeeNameFilter = null;
  departmentFilter = null;
  dojFilter = null;
  months = Months;
  previousMonths = [];
  currentDate = new Date();
  currentMonth: any;
  currentYear: any;
  selectedMonth: any;
  selectedYear: any;
  componentMonth = null;
  offset = 0;
  componentsArray = [];
  page = 1;
  pageSize = 10;


  constructor(
    private reportsService: ReportsService,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    private toastr: ToasterDisplayService,
    public modalService: NgbModal,
    private excelService: ExcelService,
  ) {
  }

  ngOnInit(): void {
    this.currentMonth = this.componentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
    this.selectedMonth = this.currentDate.getMonth();
    this.selectedYear = this.currentDate.getFullYear();
    for (let index = 0; index < 6; index++) {
      this.previousMonths.push({ month: this.selectedMonth, year: this.selectedYear });
      if (this.selectedMonth <= 1) {
        this.selectedMonth = 12;
        this.selectedYear--;
      } else {
        this.selectedMonth--;
      }
    }
    this.getEmployeBreakupListReport();
  }

  getEmployeBreakupListReport() {
    this.reportsService.getEmployeeBasicComponentBreakupList(this.currentMonth, this.currentYear).subscribe(result => {
      const component = new Set();
      result.map(employee => {
        employee.values.map((comp: any) => {
          employee[comp.shortCode] = comp.monthlyAmount;
          component.add(comp.shortCode);
        });
      });
      this.employeesBasicList = this.employeesBasicListOnDisplay = result;
      this.componentsArray = Array.from(component);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Employee Basic Component Breakup Report');
      });
  }

  payrollMonths() {
    this.currentMonth = this.componentMonth;
    this.currentYear = this.currentYear;
    this.getEmployeBreakupListReport();
  }

  exportAsXLSX(): void {
    this.excel = [];
    this.employeesBasicListOnDisplay.forEach(row => {
      const { employeeId, createdDate, modifiedDate, createdBy, modifiedBy, isArchived, id, shortCode, ...toPrint } = row.values[0];
      toPrint.effectiveDate = this.datePipe.transform(toPrint.effectiveDate);
      toPrint.monthlyAmount = this.decimalPipe.transform(toPrint.monthlyAmount);
      toPrint.bonusAmount = this.decimalPipe.transform(toPrint.bonusAmount);
      this.componentsArray.map(component => {
        toPrint[component] = this.decimalPipe.transform(row[component], '1.0-2');
      });
      this.excel.push(toPrint);
    });
    this.excelService.exportAsExcelFile(this.excel, 'Employee_Component_BreakUp_List');
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
    if (!this.employeeCodeFilter && !this.employeeNameFilter) {
      this.employeesBasicListOnDisplay = this.employeesBasicList;
      return;
    }
    if (this.dojFilter && typeof this.dojFilter == 'object') {
      date = new NgbDate(this.dojFilter.year, this.dojFilter.month, this.dojFilter.day);
    }

    this.employeesBasicListOnDisplay = this.employeesBasicList.filter(element => {
      return (
        (!this.employeeCodeFilter || element.values[0].employeeCode.toLowerCase().startsWith(this.employeeCodeFilter.toLowerCase())) &&
        (!this.employeeNameFilter || element.values[0].employeeName.toLowerCase().startsWith(this.employeeNameFilter.toLowerCase()))
        // &&
        // (!this.dojFilter || typeof this.dojFilter != 'object' || (date.after(this.getDate(element.dateOfJoin)) && date.before(this.getDate(element.dateOfJoin)))
        // || date.equals(this.getDate(element.dateOfJoin)) || date.equals(this.getDate(element.dateOfJoin))
        // )
      );
    });
  }

}
