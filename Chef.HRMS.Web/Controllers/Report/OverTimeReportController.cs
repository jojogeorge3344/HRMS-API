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
using System.Threading.Tasks;
namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
public class OverTimeReportController : ReportViewerController
{
    private readonly IOverTimeReportService overTimeReportService;
    public OverTimeReportController(IOverTimeReportService overTimeReportService, IMemoryCache memoryCache,
               IWebHostEnvironment hostingEnvironment) : base(memoryCache, hostingEnvironment)
    {
        this.overTimeReportService = overTimeReportService;
        this.ReportPath = @"Reports/OverTimeSummaryReport.rdlc";
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
                    this.ReportPath = @"Reports/OverTimeSummaryReport.rdlc";
                    break;

                case "Detailed":
                    this.ReportPath = @"Reports/OverTimeDetailedReport.rdlc";
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
            DateTime toDate = Convert.ToDateTime(CustomData["ToDate"]);
            string paygroupIds = Convert.ToString(CustomData["paygroupId"]);
            string designationIds = Convert.ToString(CustomData["designationId"]);
            string locationIds = Convert.ToString(CustomData["locationId"]);
            string departmentIds = Convert.ToString(CustomData["departmentId"]);
            string employeeCategory = Convert.ToString(CustomData["employeeGroupId"]);
            string overTimePolicyIds = Convert.ToString(CustomData["overTimePolicyIds"]);
            string employeeIds = Convert.ToString(CustomData["employeeId"]);

            switch (reportType)
            {
                case "Summary":
                    var employeeOverTimeSummary = overTimeReportService.GetOverTimeSummaryReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                    reportOption.AddDataSource("OverTimeSummary", employeeOverTimeSummary);
                    var headerSummary = overTimeReportService.GetOverTimeSummaryReportHeaderDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                    reportOption.AddDataSource("Header", headerSummary);
                    break;
                case "Detailed":
                    var employeeOverTimeDetail = overTimeReportService.GetOverTimeDetailedReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                    reportOption.AddDataSource("OverTimeDetails", employeeOverTimeDetail);
                    var headerDetail = overTimeReportService.GetOverTimeSummaryReportHeaderDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                    reportOption.AddDataSource("Header", headerDetail);
                    break;
            }
        }
    }
}

