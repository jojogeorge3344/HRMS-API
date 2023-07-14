using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using System;

namespace Chef.HRMS.Services;

public interface ILeaveReportService : IAsyncService<LeaveSummaryReportView>
{
    Task<IEnumerable<LeaveSummaryReportView>> GetLeaveSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds);
    Task<IEnumerable<LeaveDetailedReportView>> GetLeaveDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds);
    Task<IEnumerable<LeaveReportHeader>> GetLeaveSummaryReportHeaderDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategoryIds, string leaveComponentIds, string employeeIds);
}