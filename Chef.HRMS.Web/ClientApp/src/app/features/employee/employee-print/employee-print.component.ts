import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ReportViewerComponent } from "@shared/report-viewer/report-viewer.component";
import { ReportViewerService } from "@shared/report-viewer/report-viewer.service";

@Component({
  templateUrl: "./employee-print.component.html",
})
export class EmployeePrintComponent implements OnInit {
  id: number;
  loadReportOnInit: boolean;
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;

  readonly serviceUrl = "/api/hrms/EmployeeDirectoryReport";

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
