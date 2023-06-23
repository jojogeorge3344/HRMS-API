using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using OfficeOpenXml.Table.PivotTable;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace Chef.HRMS.Services
{
    
    public interface IOverTimeReportService : IAsyncService<OverTimeSummaryReportView>
    {
        Task<IEnumerable<OverTimeSummaryReportView>> GetOverTimeSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds);
        Task<IEnumerable<OverTimeDetailedReportView>> GetOverTimeDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string overTimePolicyIds, string employeeIds);
    }
}
