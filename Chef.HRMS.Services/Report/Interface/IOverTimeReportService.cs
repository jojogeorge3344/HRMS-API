using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using System;


namespace Chef.HRMS.Services;


public interface IOverTimeReportService : IAsyncService<OverTimeSummaryReportView>
{
    Task<IEnumerable<OverTimeSummaryReportView>> GetOverTimeSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds);
    Task<IEnumerable<OverTimeDetailedReportView>> GetOverTimeDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds);
    Task<IEnumerable<OverTimeReportHeader>> GetOverTimeSummaryReportHeaderDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string overTimePolicyIds, string employeeIds);
}
