import { Component, OnInit } from '@angular/core';
import { EmployeeJobTitleService } from '@settings/employee/employee-job-title/employee-job-title.service';
import { PayGroupService } from '@settings/payroll/pay-group/pay-group.service';
import { result } from 'lodash';

@Component({
  selector: 'hrms-employee-payslip-print-filter',
  templateUrl: './employee-payslip-print-filter.component.html',
  styleUrls: ['./employee-payslip-print-filter.component.scss']
})
export class EmployeePayslipPrintFilterComponent implements OnInit {
 payGroupDetails;
 designation;
  constructor(
  private payGroupService:PayGroupService,
  private employeeJobTitleService:EmployeeJobTitleService
  ) { }

  ngOnInit(): void {
    this.getPayGroup()
  }

  getPayGroup(){
    this.payGroupService.getAll().subscribe(result=>{
    this.payGroupDetails=result;
    })
  }
  getDesignation(){
this.employeeJobTitleService.getAll().subscribe(result=>{
  this.designation=result;
})
  }
}
