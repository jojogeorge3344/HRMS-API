using BoldReports.Web.ReportViewer;
using Chef.Common.Core.Services;
using Chef.Common.Data.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Services.Report;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class EmployeeRevisionBoldReportController : ReportViewerController
{
    private readonly IEmployeeRevisionBoldService employeeRevisionBoldService;
    private readonly IEmployeeService employeeService;

    public EmployeeRevisionBoldReportController(IMemoryCache memoryCache, IWebHostEnvironment hostingEnvironment, IEmployeeService employeeService,
          IEmployeeRevisionBoldService employeeRevisionBoldService) : base(memoryCache, hostingEnvironment)
    {
        ReportPath = @"Reports\EmployeeRevisionPrint.rdlc";
        this.employeeRevisionBoldService = employeeRevisionBoldService;
        this.employeeService = employeeService;

    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        AssignReportPath();
        base.OnInitReportOptions(reportOption);
    }
    private void AssignReportPath()
    {
        ReportPath = @"Reports\EmployeeRevisionPrint.rdlc";
    }
    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {

            int id = Convert.ToInt32(CustomData["id"].ToString());

            var employeeOldDetails = employeeRevisionBoldService.GetemployeeOldDetailsAsync(id).Result;
            var employeeNewDetails = employeeRevisionBoldService.GetemployeeNewDetailsAsync(id).Result;
            var requestedBy = employeeService.GetLoginEmployee(employeeNewDetails.RequestedBy).Result;
            employeeNewDetails.RequestedByFirstName = requestedBy.FirstName;
            employeeNewDetails.RequestedByMiddleName = requestedBy.MiddleName;
            employeeNewDetails.RequestedByLastName = requestedBy.LastName;
            var oldSalaryDetails = employeeRevisionBoldService.GetSalaryOldDetailsAsync(id).Result;
            var newSalaryDetails = employeeRevisionBoldService.GetSalaryNewDetailsAsync(id).Result;

            List<EmployeeRevisionOldDetailsBoldDto> employeeRevisionOldDetailsBolds = new() { employeeOldDetails };
            List<EmployeeRevisionNewDetailsBoldDto> employeeRevisionNewDetailsBoldDtos = new() { employeeNewDetails };

            reportOption.AddDataSource("EmployeeOldDetails", employeeRevisionOldDetailsBolds);
            reportOption.AddDataSource("EmployeeNewDetails", employeeRevisionNewDetailsBoldDtos);
            reportOption.AddDataSource("OldSalaryDetails", oldSalaryDetails);
            reportOption.AddDataSource("NewSalaryDetails", newSalaryDetails);
        }
    }
}