import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportViewerComponent } from '@shared/report-viewer/report-viewer.component';
import { ReportViewerService } from '@shared/report-viewer/report-viewer.service';
import { EmployeePayslipPrintFilterComponent } from '../employee-payslip-print-filter/employee-payslip-print-filter.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '@features/reports/report.service'

@Component({
  selector: 'hrms-employee-payslip-print',
  templateUrl: './employee-payslip-print.component.html',
  styleUrls: ['./employee-payslip-print.component.scss']
})
export class EmployeePayslipPrintComponent implements OnInit {

  id: number;
  loadReportOnInit: boolean;
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;
  // @Input() paygroupId;
  // @Input() department;
  // @Input() designation;
  // @Input() employeeId;
  // @Input() fromDate;
  // @Input() ToDate;

  payslipReportDetails: any;


  readonly serviceUrl = "/api/hrms/PaySlipReport";

  constructor(
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute,
    private reportService:ReportsService
  ) {
    this.reportViewerService.serviceUrl = this.serviceUrl;
  }

  ngOnInit(): void {
    this.loadReportOnInit = true;
    this.payslipReportDetails=this.reportService.getPaySlip()
    this.route.params.subscribe((params: any) => {
      this.id = params["id"];
      this.updateReportViewerService();
    });
    // this.salaryFormComponent.employeelist
  }

  load() {
    this.reportViewerService.cancelRequest = false;
    this.updateReportViewerService();
    this.reportViewerComponent.load();
  }


  private updateReportViewerService() {
    debugger
    this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
    this.reportViewerService.customData.paygroupId = this.payslipReportDetails[0].paygroupId ?  this.payslipReportDetails[0].paygroupId : 0;
    this.reportViewerService.customData.department =  this.payslipReportDetails[0].department ?  this.payslipReportDetails[0].department : 0;
    this.reportViewerService.customData.designation =  this.payslipReportDetails[0].designation ?  this.payslipReportDetails[0].designation : 0;
    this.reportViewerService.customData.employeeId =  this.payslipReportDetails[0].employeeId ?  this.payslipReportDetails[0].employeeId : 0;
    this.reportViewerService.customData.fromDate = this.payslipReportDetails[0].fromDate;
    this.reportViewerService.customData.ToDate = this.payslipReportDetails[0].ToDate;
  }
}
