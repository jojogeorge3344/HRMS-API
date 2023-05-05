using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers.Base;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Linq;

namespace Chef.HRMS.Web.Controllers.Leave
{
    [Route("api/settings/leave/[controller]")]
    [ApiController]
    public class LeavePrintController : ReportViewerController
    {
        private readonly ILeavePrintBoldReportService leavePrintBoldReportService;
        private readonly ICommonDataService commonDataService;
        public LeavePrintController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IBranchService branchService,
            ILeavePrintBoldReportService leavePrintBoldReportService, ICommonDataService commonDataService) : base(memoryCache, hostingEnvironment, branchService)
        {
            this.ReportPath = @"Reports\LeavePrintReport.rdlc";
            this.leavePrintBoldReportService = leavePrintBoldReportService;
            this.commonDataService = commonDataService;
        }
        public override void OnInitReportOptions(ReportViewerOptions reportOption)
        {
            AssignReportPath();
            base.OnInitReportOptions(reportOption);
        }
        private void AssignReportPath()
        {
            this.ReportPath = @"Reports\LeavePrintReport.rdlc";
        }
        public override void OnReportLoaded(ReportViewerOptions reportOption)
        {
            if (CustomData != null && CustomData.Count > 0)
            {
                // int id = Convert.ToInt32(CustomData["id"].ToString());

                int id = Convert.ToInt32(CustomData["id"].ToString());
                var LRData = leavePrintBoldReportService.GetLeaveRequestDetailsAsync(id).Result;

                var leaves =LRData.
                           Select(x => new LeaveRequestPrintBoldReport
                           {
                               FromDate = x.FromDate,
                               ToDate = x.ToDate,
                               RequestedOn=x.RequestedOn,
                               RejoinDate=x.RejoinDate
                           }).FirstOrDefault();

                if (leaves.FromDate == DateTime.MinValue)
                {
                    LRData.First().FromDated = "";
                }
                else
                {
                    LRData.First().FromDated = leaves.FromDate.ToString("dd-MM-yyyy");
                }
                if (leaves.ToDate == DateTime.MinValue)
                {
                    LRData.First().ToDated = "";
                }
                else
                {
                    LRData.First().ToDated = leaves.ToDate.ToString("dd-MM-yyyy");
                }
                if (leaves.RequestedOn == DateTime.MinValue)
                {
                    LRData.First().RequestedOned = "";
                }
                else
                {
                    LRData.First().RequestedOned = leaves.RequestedOn.ToString("dd-MM-yyyy");
                }
                if (leaves.RejoinDate == DateTime.MinValue)
                {
                    LRData.First().RejoinDated = "";
                }
                else
                {
                    LRData.First().RejoinDated = leaves.RejoinDate.ToString("dd-MM-yyyy");
                }


                var myObject = LRData.FirstOrDefault();
                reportOption.AddDataSource("LRPrintDataSet", LRData);
                reportOption.AddDataSource("LRPrintHeaderDataSet", new[] { myObject });

            }
        }
    }
}


