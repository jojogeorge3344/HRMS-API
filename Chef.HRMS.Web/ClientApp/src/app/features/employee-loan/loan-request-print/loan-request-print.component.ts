import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
  @Input() loanId
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;

  readonly serviceUrl = "/api/LoanPrintBoldReport";

  constructor(
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute,
    private router: Router,
   
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
   backButton(){
    debugger
    if(this.router.url.includes('/my-loan')){
     this.router.navigate(["/my-loan"])
    }else {
      this.router.navigate(["/org-employee-loan"])
    }
   }
  load() {
    this.reportViewerService.cancelRequest = false;
    this.updateReportViewerService();
    this.reportViewerComponent.load();
  }

  private updateReportViewerService() {
    this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
    this.reportViewerService.customData.id = this.id;
    if(this.loanId){
      this.reportViewerService.customData.id = this.loanId
    }
  }


}




