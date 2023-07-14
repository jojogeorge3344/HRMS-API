using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report.Interface;
using System;

namespace Chef.HRMS.Services;

public class OverTimeReportService : AsyncService<OverTimeSummaryReportView>, IOverTimeReportService
{
    private readonly IOverTimeReportRepository overTimeReportRepository;


    public OverTimeReportService(IOverTimeReportRepository overTimeReportRepository)
    {
        this.overTimeReportRepository = overTimeReportRepository;
    }
    public async Task<IEnumerable<OverTimeSummaryReportView>> GetOverTimeSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds)
    {
        return await overTimeReportRepository.GetOverTimeSummaryReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds);

    }

    public async Task<IEnumerable<OverTimeDetailedReportView>> GetOverTimeDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds)
    {

        return await overTimeReportRepository.GetOverTimeDetailedReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds);
    }

    public async Task<IEnumerable<OverTimeReportHeader>> GetOverTimeSummaryReportHeaderDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds)
    {
        return await overTimeReportRepository.GetOverTimeSummaryReportHeaderDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, overTimePolicyIds, employeeIds);
    }
}
