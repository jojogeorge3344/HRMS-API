using BoldReports.Web.ReportViewer;
using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Services.Report;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace Chef.HRMS.Web.Controllers.Report;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class PayrollStructureReportController : ReportViewerController
{
    private readonly IPayrollStructureReportService payrollStructureReportService;
    public PayrollStructureReportController(IMemoryCache memoryCache,IWebHostEnvironment hostingEnvironment,
        IPayrollStructureReportService payrollStructureReportService): base(memoryCache, hostingEnvironment)
    {
        this.payrollStructureReportService = payrollStructureReportService;
        this.ReportPath = @"Reports/.rdlc";
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        base.OnInitReportOptions(reportOption);
    }
    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            DateTime fromDate = Convert.ToDateTime(CustomData["fromDate"].ToString());
            DateTime ToDate = Convert.ToDateTime(CustomData["ToDate"].ToString());
            string payrollStructureIds = CustomData["payrollStructureIds"].ToString();
            string paygroupIds = (CustomData["paygroupIds"].ToString());
            string designationIds = CustomData["designationIds"].ToString();
            string employeeIds = (CustomData["employeeIds"].ToString());

            var employeeHederDetails = payrollStructureReportService.GetEmployeePayrollProcessDetails(fromDate, ToDate, payrollStructureIds, paygroupIds, designationIds, employeeIds).Result;
            
            reportOption.AddDataSource("EmployeeDetails", employeeHederDetails);
        }
    }
}
