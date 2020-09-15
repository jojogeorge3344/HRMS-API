import { Component, OnInit } from '@angular/core';
import { Months } from 'src/app/models/common/types/months';
import { ActivatedRoute } from '@angular/router';
import { PayrollProcessService } from '../payroll-process.service';
import { PayrollProcess } from '../payroll-process.model';
import { ToasterDisplayService } from 'src/app/core/services/toaster-service.service';

@Component({
  selector: 'hrms-payroll-process-create-container',
  templateUrl: './payroll-process-create-container.component.html'
})
export class PayrollProcessCreateContainerComponent implements OnInit {

  months = Months;
  month = Months;
  previousMonths = [];
  currentDate = new Date();
  selectedMonth: any;
  selectedYear: any;
  noOfCalendarDays: any;
  paygroupId: any;
  activeTabId = 1;
  employeeId: number;
  id: any;
  payrollProcessById: PayrollProcess;
  noOfEmployees: any;


  constructor(
    private route: ActivatedRoute,
    private payrollProcessService: PayrollProcessService,
    private toastr: ToasterDisplayService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedYear = params.date.split('-')[1];
      this.selectedMonth = this.months[params.date.split('-')[0]];
      this.month = params.date.split('-')[0];
      this.noOfCalendarDays = new Date(this.selectedYear, this.selectedMonth, 0).getDate();
      this.paygroupId = params.payGroup;
      this.id = params.id;
    });
    this.getPayrollById();
  }

  getPayrollById() {
    this.payrollProcessService.get(this.id).subscribe(result => {
      this.payrollProcessById = result;
      this.activateTab(result.processedStep + 1);
    },
      error => {
        console.error(error);
        this.toastr.showErrorMessage('Unable to fetch the Payroll Process Details by id');
      });
  }

  activateTab(tabId: number) {
    this.payrollProcessById.processedStep = tabId - 1;
    this.activeTabId = tabId;

  }

}
