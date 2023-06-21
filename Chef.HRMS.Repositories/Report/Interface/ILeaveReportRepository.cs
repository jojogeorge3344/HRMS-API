using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveReportRepository : IGenericRepository<LeaveSummaryReportView>
    {
        Task<IEnumerable<LeaveSummaryReportView>> GetLeaveSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds);
        Task<IEnumerable<LeaveDetailedReportView>> GetLeaveDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds);
    }
}