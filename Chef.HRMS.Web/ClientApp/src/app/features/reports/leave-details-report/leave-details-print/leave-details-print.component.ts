import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportViewerComponent } from '@shared/report-viewer/report-viewer.component';
import { ReportViewerService } from '@shared/report-viewer/report-viewer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReportsService } from '@features/reports/report.service';

@Component({
  selector: 'hrms-leave-details-print',
  templateUrl: './leave-details-print.component.html',
  styleUrls: ['./leave-details-print.component.scss']
})
export class LeaveDetailsPrintComponent implements OnInit {

  readonly serviceUrl = "/api/hrms/LeaveReport";
  id: number;
  loadReportOnInit: boolean;
  data;

  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;

  constructor(
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute,
    private reportService:ReportsService,

  ) {
    this.reportViewerService.serviceUrl = this.serviceUrl;
  }

  ngOnInit(): void {
    this.loadReportOnInit = true;
    this.route.params.subscribe((params: any) => {
      this.id = params["id"];
      this.getFilterData()
      this.updateReportViewerService();
    });
    // this.salaryFormComponent.employeelist
  }

  getFilterData(){
   this.data= this.reportService.getOption()
   console.log('data',this.data);
   
  }
  load() {
    this.reportViewerService.cancelRequest = false;
    this.updateReportViewerService();
    this.reportViewerComponent.load();
  }


  private updateReportViewerService() {
    debugger
    this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
    this.reportViewerService.customData.reportType = this.data[0].reportType;
    this.reportViewerService.customData.paygroupId = this.data[0].paygroupId;
    this.reportViewerService.customData.departmentId = this.data[0].departmentId;
    this.reportViewerService.customData.designationId = this.data[0].designationId;
    this.reportViewerService.customData.employeeId = this.data[0].employeeId;
    this.reportViewerService.customData.locationId = this.data[0].locationId;
    this.reportViewerService.customData.employeeGroupId = this.data[0].employeeGroupId;
    this.reportViewerService.customData.leaveComponentId = this.data[0].leaveComponentId;
    this.reportViewerService.customData.fromDate = this.data[0].fromDate;
    this.reportViewerService.customData.ToDate = this.data[0].ToDate;
  }
}
