using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.Common.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Controllers;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;

namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class EmployeeDirectoryReportController : ReportViewerController
{
    private readonly IEmployeeService employeeService;
    private readonly IJobDetailsService jobDetailsService;
    private readonly IJobFilingService jobFilingService;
    private readonly IEmployeeSalaryConfigurationService employeeSalaryConfigurationService;
    private readonly IEmployeeBonusService employeeBonusService;
    private readonly IWPSUserService wPSUserService;
    private readonly IAddressService addressService;

    public EmployeeDirectoryReportController(
           IMemoryCache memoryCache,
           IWebHostEnvironment hostingEnvironment,
           IEmployeeService employeeService,
           IJobDetailsService jobDetailsService,
           IJobFilingService jobFilingService,
           IEmployeeSalaryConfigurationService employeeSalaryConfigurationService,
           IEmployeeBonusService employeeBonusService,
           IWPSUserService wPSUserService,
           IAddressService addressService,
           IBranchService branchService
           //IDMSService dMSService
           )
      : base(memoryCache, hostingEnvironment, branchService)
    {
        this.employeeService = employeeService;
        this.jobDetailsService = jobDetailsService;
        this.jobFilingService = jobFilingService;
        this.addressService = addressService;
        this.employeeBonusService = employeeBonusService;
        this.employeeSalaryConfigurationService = employeeSalaryConfigurationService;
        this.wPSUserService = wPSUserService;
        this.ReportPath = @"Reports/.rdlc";
    }

    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string id = CustomData["id"].ToString();

            var employeeBasic = employeeService.GetAsync(Convert.ToInt32(id));
            var jobDetails = jobDetailsService.GetAsync(Convert.ToInt32(id));
            var jobFilling = jobFilingService.GetAsync(Convert.ToInt32(id));
            var address = addressService.GetAllByEmployeeId(Convert.ToInt32(id));
            var employeeBonus = employeeBonusService.GetAllBonusByEmployeeId(Convert.ToInt32(id));
            var employeeSalaryConfig = employeeSalaryConfigurationService.GetSalaryConfigurationByEmployeeId(Convert.ToInt32(id));
            var wpsDetails = wPSUserService.GetAllByemployeeId(Convert.ToInt32(id));

            reportOption.AddDataSource("EmployeeBasic", employeeBasic);
            reportOption.AddDataSource("JobDetails", jobDetails);
            reportOption.AddDataSource("JobFilling", jobFilling);
            reportOption.AddDataSource("Address", address);
            reportOption.AddDataSource("EmployeeBonus", employeeBonus);
            reportOption.AddDataSource("EmployeeSalaryConfig", employeeSalaryConfig);
            reportOption.AddDataSource("WPSDetails", wpsDetails);
        }
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        base.OnInitReportOptions(reportOption);
    }
}
