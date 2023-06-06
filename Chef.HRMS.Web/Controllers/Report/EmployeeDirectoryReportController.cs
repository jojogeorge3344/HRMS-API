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
using Chef.HRMS.Services.Report;
using Chef.HRMS.Models.Report;
using System.Linq;

namespace Chef.HRMS.Web.Controllers;

[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class EmployeeDirectoryReportController : ReportViewerController
{
    private readonly IEmployeeSalaryConfigurationService employeeSalaryConfigurationService;
    private readonly IReligionService religionService;
    private readonly IEmployeeDirectoryReportService employeeDirectoryReportService;
    private readonly IMasterDataService masterDataService;


    public EmployeeDirectoryReportController(
           IMemoryCache memoryCache,
           IWebHostEnvironment hostingEnvironment,
           IEmployeeSalaryConfigurationService employeeSalaryConfigurationService,
           IEmployeeBonusService employeeBonusService,
           IReligionService religionService,
           IEmployeeDirectoryReportService employeeDirectoryReportService,
           IMasterDataService masterDataService
           )
      : base(memoryCache, hostingEnvironment)
    {
        this.employeeSalaryConfigurationService = employeeSalaryConfigurationService;
        this.religionService = religionService;
        this.employeeDirectoryReportService = employeeDirectoryReportService;
        this.masterDataService = masterDataService;
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
    public override async void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string id = CustomData["id"].ToString();

            var employeeBasic = employeeDirectoryReportService.GetBasicDetailsByEmployeeId(Convert.ToInt32(id)).Result;
            var relegionDetail = religionService.GetAsync(Convert.ToInt32(employeeBasic.ReligionId)).Result;
            var jobDetail = employeeDirectoryReportService.GetByEmployeeId(Convert.ToInt32(id)).Result;
            var jobFilling = employeeDirectoryReportService.GetJobFillingDetailsByEmployeeId(Convert.ToInt32(id)).Result;
            var addressDetails = employeeDirectoryReportService.GetAddressDetailsByEmployeeId(Convert.ToInt32(id)).Result;
            var currentCountry = masterDataService.GetCountryById(addressDetails.CurrentCountry).Result;
            var currentState = masterDataService.GetStateByStateId(addressDetails.CurrentState).Result;
            var permanentCountry = masterDataService.GetCountryById(addressDetails.PermanentCountry).Result;
            var permanentState = masterDataService.GetStateByStateId(addressDetails.PermanentState).Result;
            addressDetails.CurrentCountryName = currentCountry.Name;
            addressDetails.PermanentCountryName = permanentCountry.Name;
            addressDetails.CurrentStateName = currentState.Name;
            addressDetails.PermanentStateName = permanentState.Name;
            var employeeSalaryConfigDetails = employeeDirectoryReportService.GetSalaryDetailsByEmployeeId(Convert.ToInt32(id)).Result;
            var wpsDetail = employeeDirectoryReportService.GetWPSDetailsByemployeeId(Convert.ToInt32(id)).Result;
            
            List<EmployeeBasicDetailsReport> employee = new() { employeeBasic };
            employee.ForEach(x => x.ReligionName=relegionDetail.Name);
            List<JobDetailsReportView> jobDetails = new() { jobDetail };
            List<JobFillingReportView> jobFiling = new() { jobFilling };
            List<WPSDetailsReportView> wPSDetailsReportViews = new() { wpsDetail };
            List<AddressDetailsReportView> addresses= new() { addressDetails };

            reportOption.AddDataSource("EmployeeBasic", employee);
            reportOption.AddDataSource("JobDetails", jobDetails);
            reportOption.AddDataSource("JobFilling", jobFiling);
            reportOption.AddDataSource("Address", addresses);
            reportOption.AddDataSource("EmployeeSalaryConfig", employeeSalaryConfigDetails);
            reportOption.AddDataSource("WPSDetails", wPSDetailsReportViews);
        }
    }
    
}
