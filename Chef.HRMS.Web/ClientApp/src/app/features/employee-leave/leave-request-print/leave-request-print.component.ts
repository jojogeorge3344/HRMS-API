import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportViewerComponent } from '@shared/report-viewer/report-viewer.component';
import { ReportViewerService } from '@shared/report-viewer/report-viewer.service';

@Component({
  selector: 'hrms-leave-request-print',
  templateUrl: './leave-request-print.component.html',
  styleUrls: ['./leave-request-print.component.scss']
})
export class LeaveRequestPrintComponent implements OnInit {

  id: number;
  loadReportOnInit: boolean;
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;

  readonly serviceUrl = "/api/Leave/LeavePrint";

  constructor(
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
  }

  load() {
    this.reportViewerService.cancelRequest = false;
    this.updateReportViewerService();
    this.reportViewerComponent.load();
  }

  private updateReportViewerService() {
    this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
    this.reportViewerService.customData.id = this.id;
  }

}
