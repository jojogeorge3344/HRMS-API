﻿using BoldReports.RDL.DOM;
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
namespace Chef.HRMS.Web.Controllers
{
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
                DateTime toDate = Convert.ToDateTime(CustomData["ToDate"].ToString());
                string paygroupIds = (CustomData["paygroupId"].ToString());
                string designationIds = CustomData["designationId"].ToString();
                string locationIds = CustomData["locationId"].ToString();
                string departmentIds = CustomData["departmentId"].ToString();
                string employeeCategory = CustomData["employeeGroupId"].ToString();
                string overTimePolicyIds = CustomData["overTimePolicyIds"].ToString();
                string employeeIds = (CustomData["employeeId"].ToString());

                switch (reportType)
                {
                    case "Summary":
                        var employeeOverTimeSummary = overTimeReportService.GetOverTimeSummaryReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                        reportOption.AddDataSource("OverTimeSummary", employeeOverTimeSummary);
                        break;
                    case "Detailed":
                        var employeeOverTimeDetail = overTimeReportService.GetOverTimeDetailedReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds).Result;
                        reportOption.AddDataSource("OverTimeDetails", employeeOverTimeDetail);
                        break;
                }
            }
        }
    }
}
