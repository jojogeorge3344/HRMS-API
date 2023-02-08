import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '@features/employee/employee.service';
import { Employee } from '@features/employee/employee.model';
import { PayrollProcessService } from '../payroll-process.service';

@Component({
  selector: 'hrms-payroll-process-employee-container',
  templateUrl: './payroll-process-employee-container.component.html',
  styles: [
  ]
})
export class PayrollProcessEmployeeContainerComponent implements OnInit {
  @ViewChild('nav') tabset: any;
  activeTabId = 1;
  employeeId: number;
  employee: Employee;
  payrollProcessById: any;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private payrollProcessService: PayrollProcessService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.employeeId = parseInt(params.employee, 10);
      this.id = parseInt(params.id, 10);

    });
    // this.getPayrollById();
    this.employeeService.getDetails(this.employeeId).subscribe(res => {
      this.employee = res;
    });
  }
  getPayrollById() {
    this.payrollProcessService.getEmployeeDetails(this.id, this.employeeId).subscribe(result => {
      this.payrollProcessById = result;
      this.activateTab(result.processedStep + 1);
    });
  }
  activateTab(tabId: number) {
    this.payrollProcessById.processedStep = tabId - 1;
    this.activeTabId = tabId;
  }


}
