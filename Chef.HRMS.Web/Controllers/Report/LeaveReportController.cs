using BoldReports.RDL.DOM;
using BoldReports.Web.ReportViewer;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class LeaveReportController : ReportViewerController
{
    private readonly ILeaveReportService leaveReportService;

    public LeaveReportController(ILeaveReportService leaveReportService, IMemoryCache memoryCache,
       IWebHostEnvironment hostingEnvironment) : base(memoryCache, hostingEnvironment)
    {
        this.leaveReportService = leaveReportService;
        this.ReportPath = @"Reports/LeaveSummaryReport.rdlc";
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        AssignReportPath();
        base.OnInitReportOptions(reportOption);
    }
    private void AssignReportPath()
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string reportType = CustomData["reportType"].ToString();

            switch (reportType)
            {
                case "Summary":
                    this.ReportPath = @"Reports/LeaveSummaryReport.rdlc";
                    break;

                case "Detailed":
                    this.ReportPath = @"Reports/LeaveDetailedReport.rdlc";
                    break;
            }
        }
    }
    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string reportType = CustomData["reportType"].ToString();
            DateTime fromDate = Convert.ToDateTime(CustomData["fromDate"].ToString());
            DateTime toDate = Convert.ToDateTime(CustomData["ToDate"].ToString());
            string paygroupIds = (CustomData["paygroupId"].ToString());
            string designationIds = CustomData["designationId"].ToString();
            string locationIds = CustomData["locationId"].ToString();
            string departmentIds = CustomData["departmentId"].ToString();
            string employeeCategoryIds = CustomData["employeeGroupId"].ToString();
            string leaveComponentIds = CustomData["leaveComponentId"].ToString();
            string employeeIds = (CustomData["employeeId"].ToString());

            switch (reportType)
            {
                case "Summary":
                    var employeeLeaveSummary = leaveReportService.GetLeaveSummaryReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds).Result;
                    reportOption.AddDataSource("LeaveSummary", employeeLeaveSummary);
                    var headerSummary = leaveReportService.GetLeaveSummaryReportHeaderDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds).Result;
                    reportOption.AddDataSource("Header", headerSummary);
                    break;

                case "Detailed":
                    var employeeLeaveDetail = leaveReportService.GetLeaveDetailedReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds).Result;
                    reportOption.AddDataSource("LeaveDetails", employeeLeaveDetail);
                    var headerDetail = leaveReportService.GetLeaveSummaryReportHeaderDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategoryIds, leaveComponentIds, employeeIds).Result;
                    reportOption.AddDataSource("Header", headerDetail);
                    break;
            }
        }
    }
}