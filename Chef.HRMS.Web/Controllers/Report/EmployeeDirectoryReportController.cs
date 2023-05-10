using BoldReports.Web.ReportViewer;
using Chef.Common.Core.Services;
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
using Chef.HRMS.Models;

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
    private readonly IBaseService baseService;


    public EmployeeDirectoryReportController(
           IMemoryCache memoryCache,
           IWebHostEnvironment hostingEnvironment,
           IBranchService branchService,
           IEmployeeService employeeService,
           IJobDetailsService jobDetailsService,
           IJobFilingService jobFilingService,
           IEmployeeSalaryConfigurationService employeeSalaryConfigurationService,
           IEmployeeBonusService employeeBonusService,
           IWPSUserService wPSUserService,
           IAddressService addressService,
           IBaseService baseService
           )
      : base(memoryCache, hostingEnvironment, branchService)
    {
        this.employeeService = employeeService;
        this.jobDetailsService = jobDetailsService;
        this.jobFilingService= jobFilingService;
        this.addressService = addressService;
        this.employeeBonusService = employeeBonusService;
        this.employeeSalaryConfigurationService = employeeSalaryConfigurationService;
        this.wPSUserService= wPSUserService;
        this.baseService= baseService;
        this.ReportPath = @"Reports\EmployeeDetailsFormatNewDesign.rdlc";
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        AssignReportPath();
        base.OnInitReportOptions(reportOption);
    }
    private void AssignReportPath()
    {
        this.ReportPath = @"Reports\EmployeeDetailsFormatNewDesign.rdlc";
    }
    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string id = CustomData["id"].ToString();

            var employeeBasic = employeeService.GetAsync(Convert.ToInt32(id)).Result;
            var jobDetail = jobDetailsService.GetByEmployeeId(Convert.ToInt32(id)).Result;
            var jobFilling = jobFilingService.GetByEmployeeId(Convert.ToInt32(id)).Result;
            var addressDetails = addressService.GetAllByEmployeeId(Convert.ToInt32(id)).Result;
            var employeeBonusDetails = employeeBonusService.GetAllBonusByEmployeeId(Convert.ToInt32(id)).Result;
            var employeeSalaryConfigDetails = employeeSalaryConfigurationService.GetSalaryConfigurationByEmployeeId(Convert.ToInt32(id)).Result;
            var wpsDetail = wPSUserService.GetAllByemployeeId(Convert.ToInt32(id)).Result;

            List<HRMSEmployee> employee = new() { employeeBasic };
            List<JobDetails> jobDetails = new() { jobDetail };
            List<JobFiling> jobFiling = new() { jobFilling };

            reportOption.AddDataSource("EmployeeBasic", employee);
            reportOption.AddDataSource("JobDetails", jobDetails);
            reportOption.AddDataSource("JobFilling", jobFiling);
            reportOption.AddDataSource("AddressDetails", addressDetails);
            reportOption.AddDataSource("EmployeeBonus", employeeBonusDetails);
            reportOption.AddDataSource("EmployeeSalaryConfig", employeeSalaryConfigDetails);
            reportOption.AddDataSource("WPSDetails", wpsDetail);
        }
    }
    
}
