import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportViewerComponent } from '@shared/report-viewer/report-viewer.component';
import { ReportViewerService } from '@shared/report-viewer/report-viewer.service';
import { EmployeePayslipPrintFilterComponent } from '../employee-payslip-print-filter/employee-payslip-print-filter.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  @Input() paygroupId;
  @Input() department;
  @Input() designation;
  @Input() employeeId;
  @Input() fromDate;
  @Input() ToDate;


  readonly serviceUrl = "/api/hrms/PaySlipReport";

  constructor(
    public activeModal: NgbActiveModal,
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute
  ) {
    this.reportViewerService.serviceUrl = this.serviceUrl;
  }

  ngOnInit(): void {
    this.loadReportOnInit = true;
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
    this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
    this.reportViewerService.customData.paygroupId = this.paygroupId;
    this.reportViewerService.customData.department = this.department;
    this.reportViewerService.customData.designation = this.designation;
    this.reportViewerService.customData.employeeId = this.employeeId;
    this.reportViewerService.customData.fromDate = this.fromDate;
    this.reportViewerService.customData.ToDate = this.ToDate;
  }
}
