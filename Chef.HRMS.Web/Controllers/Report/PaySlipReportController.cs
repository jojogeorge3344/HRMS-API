using BoldReports.Web.ReportViewer;
using Chef.Common.Data.Services;
using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Services.Report;
using Chef.HRMS.Web.Controllers;
using Chef.HRMS.Web.Extensions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Org.BouncyCastle.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;


[Route("api/hrms/[controller]/[action]")]
[ApiController]
public class PaySlipReportController : ReportViewerController
{
    private readonly IEmployeeService employeeService;
    private readonly IPayslipReportService payslipReportService;
    readonly IMasterDataService masterDataService;
    private Currency currencyData;
    private Company companyData;
    private Country countryData;

    public PaySlipReportController(IPayslipReportService payslipReportService,
           IMemoryCache memoryCache,
           IWebHostEnvironment hostingEnvironment,
           IEmployeeService employeeService,
           IMasterDataService masterDataService
           )
      : base(memoryCache, hostingEnvironment)
    {
        this.employeeService = employeeService;
        this.payslipReportService = payslipReportService;
        this.masterDataService = masterDataService;
        this.ReportPath = @"Reports/PayAdviceReport.rdlc";
    }
    public override void OnInitReportOptions(ReportViewerOptions reportOption)
    {
        base.OnInitReportOptions(reportOption);
    }

    public override void OnReportLoaded(ReportViewerOptions reportOption)
    {
        if (CustomData != null && CustomData.Count > 0)
        {
            string employeeIds = (CustomData["employeeId"].ToString());
            DateTime fromDate = Convert.ToDateTime(CustomData["fromDate"].ToString());
            DateTime ToDate = Convert.ToDateTime(CustomData["ToDate"].ToString());
            string paygroupIds = (CustomData["paygroupId"].ToString());
            string departmentIds = CustomData["department"].ToString();
            string designationIds = CustomData["designation"].ToString();

            var header = payslipReportService.EmployeeHeaderDetails(employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds).Result;
            var componentDetails = payslipReportService.EmployeeComponentDetails(employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds).Result;
            var overtimeDetails = payslipReportService.EmployeeOverTimeDetails(employeeIds, fromDate, ToDate).Result;
            var loanDetails = payslipReportService.EmployeeLoanDetails(employeeIds, fromDate, ToDate).Result;

            List<PayrollHeaderView> payrollHeaderView = header.ToList();
            List<PayrollComponentReportView> payrollComponentReportView = componentDetails.ToList();
            foreach (PayrollHeaderView item in payrollHeaderView)
            {
                if (item.BasicPay == 0)
                {
                    var row = payrollComponentReportView.Where(x => x.EmployeeId == item.EmployeeId).FirstOrDefault();
                    item.BasicPay = row.EarningsAmt;
                }

                var country = this.GetCountryById(item.Currentcountry).Result;
                item.CountryName = country.Name;
            }
            int currencyId = 0;

            foreach (var items in header)
            {
                currencyId = items.CurrencyId;
                Task.Run(() => this.GetByCurrency(currencyId)).Wait();
                
            }

            var currencylist = new List<Currency>();
            currencylist.Add(currencyData);
            Task.Run(() => this.GetCompany()).Wait();
            if (companyData != null) Task.Run(() => this.GetByCurrency(companyData.CurrencyId)).Wait();
            var companyCurrencylist = new List<Currency>();
            companyCurrencylist.Add(currencyData);

            reportOption.AddDataSource("EmployeeHeader", header);
            reportOption.AddDataSource("ComponentDetails", componentDetails);
            reportOption.AddDataSource("OverTimeDetails", overtimeDetails);
            reportOption.AddDataSource("LoanDetails", loanDetails);
            reportOption.AddDataSource("CurrencyData", currencylist);
            reportOption.AddDataSource("CompanyCurrencyData", companyCurrencylist);
        }
    }

    public async Task<Currency> GetByCurrency(int currencyId)
    {
        currencyData = await masterDataService.GetCurrency(currencyId);
        return (Currency)currencyData;
    }

    public async Task<Company> GetCompany()
    {
        companyData = await this.masterDataService.GetBaseCompany();
        return (Company)companyData;
    }

    public async Task<Country> GetCountryById(int countryId)
    {
        var countryData = await masterDataService.GetCountryById(countryId);
        return (Country)countryData;
    }
}
