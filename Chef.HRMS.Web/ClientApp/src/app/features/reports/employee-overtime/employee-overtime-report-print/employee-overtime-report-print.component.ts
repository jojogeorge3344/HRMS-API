import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ReportsService } from '@features/reports/report.service';
import { ReportViewerComponent } from "@shared/report-viewer/report-viewer.component";
import { ReportViewerService } from "@shared/report-viewer/report-viewer.service";

@Component({
  selector: 'hrms-employee-overtime-report-print',
  templateUrl: './employee-overtime-report-print.component.html',
  styleUrls: ['./employee-overtime-report-print.component.scss']
})
export class EmployeeOvertimeReportPrintComponent implements OnInit {

  id: number;
  loadReportOnInit: boolean;
  overtimeReportDetails:any
  @ViewChild(ReportViewerComponent)
  reportViewerComponent: ReportViewerComponent;
  paygroupId;
  locationId
  departmentId
  employeeGroupId
  overTimePolicyIds
  employeeId
  designationId


  readonly serviceUrl = "/api/hrms/OverTimeReport";

  constructor(
    private reportViewerService: ReportViewerService,
    private route: ActivatedRoute,
    private reportService:ReportsService,
  ) {
    this.reportViewerService.serviceUrl = this.serviceUrl;
  }

  ngOnInit(): void {
    this.loadReportOnInit = true;
    this.overtimeReportDetails=this.reportService.setOvertime()
    this.updateReportViewerService();
  }

  load() {
    this.reportViewerService.cancelRequest = false;
    this.updateReportViewerService();
    this.reportViewerComponent.load();
  }

  private updateReportViewerService() {
    if(this.overtimeReportDetails[0].PaygroupName){
      let selectedIds=this.overtimeReportDetails[0].PaygroupName
      let arrValue = selectedIds.map(({id}) =>id);
      this.paygroupId= arrValue.join()
    }else{
      this.paygroupId=null
    }

    if(this.overtimeReportDetails[0].LocationName){
      let selectedIds=this.overtimeReportDetails[0].LocationName
      let arrValue = selectedIds.map(({id}) =>id);
      this.locationId= arrValue.join()
    }else{
      this.locationId=null
    }

    if(this.overtimeReportDetails[0].Department){
      let selectedIds=this.overtimeReportDetails[0].Department
      let arrValue = selectedIds.map(({id}) =>id);
      this.departmentId= arrValue.join()
    }else{
      this.departmentId=null
    }

    if(this.overtimeReportDetails[0].employeeGroup){
      let selectedIds=this.overtimeReportDetails[0].employeeGroup
      let arrValue = selectedIds.map(({id}) =>id);
      this.employeeGroupId= arrValue.join()
    }else{
      this.employeeGroupId=null
    }

    if(this.overtimeReportDetails[0].overtimeName){
      let selectedIds=this.overtimeReportDetails[0].overtimeName
      let arrValue = selectedIds.map(({id}) =>id);
      this.overTimePolicyIds= arrValue.join()
    }else{
      this.overTimePolicyIds=null
    }

    if(this.overtimeReportDetails[0].EmployeeFullName){
      let selectedIds=this.overtimeReportDetails[0].EmployeeFullName
      let arrValue = selectedIds.map(({id}) =>id);
      this.employeeId= arrValue.join()
    }else{
      this.employeeId=null
    }
    if(this.overtimeReportDetails[0].DesignationName){
      let selectedIds=this.overtimeReportDetails[0].DesignationName
      let arrValue = selectedIds.map(({id}) =>id);
      this.designationId= arrValue.join()
    }else{
      this.designationId=null
    }

      this.reportViewerService.loadReportOnInit = this.loadReportOnInit;
      this.reportViewerService.customData.paygroupId = this.paygroupId
      this.reportViewerService.customData.locationId=this.locationId
      this.reportViewerService.customData.departmentId=this.departmentId
      this.reportViewerService.customData.employeeGroupId=this.employeeGroupId
      this.reportViewerService.customData.overTimePolicyIds=this.overTimePolicyIds
      this.reportViewerService.customData.employeeId=this.employeeId
      this.reportViewerService.customData.designationId=this.designationId
      this.reportViewerService.customData.NormalOverTimeHrs=this.overtimeReportDetails[0].normalOT
      this.reportViewerService.customData.HolidayOverTimeHrs=this.overtimeReportDetails[0].holidayOT
      this.reportViewerService.customData.SpecialOverTimeHrs=this.overtimeReportDetails[0].specialOT
      this.reportViewerService.customData.reportType=this.overtimeReportDetails[0].reportType
      this.reportViewerService.customData.fromDate=this.overtimeReportDetails[0].fromDate
      this.reportViewerService.customData.ToDate=this.overtimeReportDetails[0].ToDate
      this.reportViewerService.customData.isAllSelect=this.overtimeReportDetails[0].isAllSelect

  }

}




