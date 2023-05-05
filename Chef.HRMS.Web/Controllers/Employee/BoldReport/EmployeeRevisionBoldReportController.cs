using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers.Base;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeRevisionBoldReportController : ReportViewerController
    {
        private readonly IEmployeeRevisionBoldService employeeRevisionBoldService;
        private readonly ICommonDataService commonDataService;
        public EmployeeRevisionBoldReportController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IBranchService branchService,
              IEmployeeRevisionBoldService employeeRevisionBoldService, ICommonDataService commonDataService) : base(memoryCache, hostingEnvironment, branchService)
        {
            this.ReportPath = @"Reports\EmployeeRevisionPrintReport.rdlc";
            this.employeeRevisionBoldService = employeeRevisionBoldService;
            this.commonDataService = commonDataService;
        }
        public override void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            AssignReportPath();
            base.OnInitReportOptions(reportOption);
        }
        private void AssignReportPath()
        {
            this.ReportPath = @"Reports\EmployeeRevisionPrintReport.rdlc";
        }
        public override void OnReportLoaded(ReportViewerOptions reportOption)
        {
            if (CustomData != null && CustomData.Count > 0)
            {
                // int id = Convert.ToInt32(CustomData["id"].ToString());

                int id = Convert.ToInt32(CustomData["id"].ToString());
                var ERData = employeeRevisionBoldService.GetemployeeOldDetailsAsync(id).Result;

            }
        }
    }
}

