using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.Common.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Services.Report;
using Chef.HRMS.Web.Controllers.Base;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;

namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class PaySlipReportController : ReportViewerController
{
    private readonly IEmployeeService employeeService;
    private readonly IPayslipReportService payslipReportService;

    public PaySlipReportController( IPayslipReportService payslipReportService,
           IMemoryCache memoryCache,
           IWebHostEnvironment hostingEnvironment,
           IEmployeeService employeeService
           )
      : base(memoryCache, hostingEnvironment)
    {
        this.employeeService = employeeService;
        this.payslipReportService = payslipReportService;
        this.ReportPath = @"Reports/.rdlc";
    }

    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string employeeId =(CustomData["employeeId"].ToString());
            DateTime fromDate = Convert.ToDateTime(CustomData["fromDate"].ToString());
            DateTime ToDate = Convert.ToDateTime(CustomData["ToDate"].ToString());
            string paygroupId = CustomData["paygroupId"].ToString();
            string department = CustomData["department"].ToString();
            string designation = CustomData["designation"].ToString();

            var header = payslipReportService.EmployeeHeaderDetails(employeeId, fromDate, ToDate);
            var componentDetails = payslipReportService.EmployeeComponentDetails(employeeId, fromDate, ToDate);
            var overtimeDetails = payslipReportService.EmployeeOverTimeDetails(employeeId, fromDate, ToDate);
            var loanDetails = payslipReportService.EmployeeLoanDetails(employeeId, fromDate, ToDate);

            reportOption.AddDataSource("EmployeeHeader", header);
            reportOption.AddDataSource("ComponentDetails", componentDetails);
            reportOption.AddDataSource("OverTimeDetails", overtimeDetails);
            reportOption.AddDataSource("LoanDetails", loanDetails);
        }
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        base.OnInitReportOptions(reportOption);
    }
}
