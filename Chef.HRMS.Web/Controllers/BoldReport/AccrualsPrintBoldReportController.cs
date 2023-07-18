using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.HRMS.Services;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using Chef.HRMS.Web.Controllers;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Linq;
using System.Xml.Linq;

namespace Chef.HRMS.Web.Controllers.BoldReport;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccrualsPrintBoldReportController : ReportViewerController
{
    private readonly ILeaveAccrualService accrualPrintBoldReportService;

    public AccrualsPrintBoldReportController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment,
          ILeaveAccrualService accrualPrintBoldReportService) : base(memoryCache, hostingEnvironment)
    {
        this.ReportPath = @"Reports\AccrualsPrintReport.rdlc";
        this.accrualPrintBoldReportService = accrualPrintBoldReportService;
    }

    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        AssignReportPath();
        base.OnInitReportOptions(reportOption);
    }
    private void AssignReportPath()
    {
        this.ReportPath = @"Reports\AccrualsPrintReport.rdlc";
    }
    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            // int id = Convert.ToInt32(CustomData["id"].ToString());

            int id = Convert.ToInt32(CustomData["id"].ToString());
            var LPData = accrualPrintBoldReportService.GetAccrualsByPayrollProcessingId(id).Result;
            var myObject = LPData.FirstOrDefault();
            reportOption.AddDataSource("AccrualsPrintDataSet", LPData);
            reportOption.AddDataSource("AccrualsPrintHeaderDataSet", new[] { myObject });

        }
    }

}