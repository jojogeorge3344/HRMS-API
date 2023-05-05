import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ReportViewerComponent } from "@shared/report-viewer/report-viewer.component";
import { ReportViewerService } from "@shared/report-viewer/report-viewer.service";

@Component({
  selector: 'hrms-loan-request-print',
  templateUrl: './loan-request-print.component.html',
  styleUrls: ['./loan-request-print.component.scss']
})
export class LoanRequestPrintComponent implements OnInit {

  id: number;
  loadReportOnInit: boolean;
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;

  readonly serviceUrl = "/api/settings/BoldReport";

  constructor(
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute,
    public activeModal: NgbActiveModal,
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




