using BoldReports.Web.ReportViewer;
using Chef.Common.Core.Services;
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

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/hrms/[controller]/[action]")]
    [ApiController]
    public class EmployeeRevisionBoldReportController : ReportViewerController
    {
        private readonly IEmployeeRevisionBoldService employeeRevisionBoldService;
        private readonly ICommonDataService commonDataService;
        private readonly IBaseService baseService;

        public EmployeeRevisionBoldReportController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IBranchService branchService,
              IEmployeeRevisionBoldService employeeRevisionBoldService, ICommonDataService commonDataService) : base(memoryCache, hostingEnvironment, branchService)
        {
            this.ReportPath = @"Reports\EmployeeRevisionPrint.rdlc";
            this.employeeRevisionBoldService = employeeRevisionBoldService;
            this.commonDataService = commonDataService;
            this.baseService = baseService;
        }
        public override void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            AssignReportPath();
            base.OnInitReportOptions(reportOption);
        }
        private void AssignReportPath()
        {
            this.ReportPath = @"Reports\EmployeeRevisionPrint.rdlc";
        }
        public override void OnReportLoaded(ReportViewerOptions reportOption)
        {
            if (CustomData != null && CustomData.Count > 0)
            {
                // int id = Convert.ToInt32(CustomData["id"].ToString());

                int id = Convert.ToInt32(CustomData["id"].ToString());
                var ERData = employeeRevisionBoldService.GetemployeeOldDetailsAsync(id).Result;
                var ERNewData = employeeRevisionBoldService.GetemployeeNewDetailsAsync(id).Result;
                var SalOldData = employeeRevisionBoldService.GetSalaryOldDetailsAsync(id).Result;
                var SalNewData = employeeRevisionBoldService.GetSalaryNewDetailsAsync(id).Result;
                reportOption.AddDataSource("EROldPrintDataSet", ERData);
                reportOption.AddDataSource("ESOldPrintDataSet", SalOldData);
            }
        }
    }
}

