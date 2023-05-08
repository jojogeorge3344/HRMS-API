using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Linq;
using System.Xml.Linq;

namespace Chef.HRMS.Web.Controllers.BoldReport
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoanPrintBoldReportController : ReportViewerController
    {
        private readonly ILoanPrintBoldReportService loanPrintBoldReportService;
        private readonly ICommonDataService commonDataService;
        public LoanPrintBoldReportController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IBranchService branchService,
              ILoanPrintBoldReportService loanPrintBoldReportService) : base(memoryCache, hostingEnvironment, branchService)
        {
            this.ReportPath = @"Reports\LoanPrintReport.rdlc";
            this.loanPrintBoldReportService = loanPrintBoldReportService;
            //this.commonDataService = commonDataService;
        }
        public override void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            AssignReportPath();
            base.OnInitReportOptions(reportOption);
        }
        private void AssignReportPath()
        {
            this.ReportPath = @"Reports\LoanPrintReport.rdlc";
        }
        public override void OnReportLoaded(ReportViewerOptions reportOption)
        {
            if (CustomData != null && CustomData.Count > 0)
            {
                // int id = Convert.ToInt32(CustomData["id"].ToString());

                int id = Convert.ToInt32(CustomData["id"].ToString());
                var LPData = loanPrintBoldReportService.GetLoanDetailsAsync(id).Result;
                var myObject = LPData.FirstOrDefault();
                reportOption.AddDataSource("PoPrintDataSet", LPData);
                reportOption.AddDataSource("PoPrintHeaderDataSet", new[] { myObject });

            }
        }

    }
}