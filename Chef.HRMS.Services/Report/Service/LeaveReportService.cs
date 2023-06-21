using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveReportService : AsyncService<LeaveSummaryReportView>, ILeaveReportService
    {
        private readonly ILeaveReportRepository leaveReportRepository;

        public LeaveReportService(ILeaveReportRepository leaveReportRepository)
        {
            this.leaveReportRepository = leaveReportRepository;
        }

        public async Task<IEnumerable<LeaveSummaryReportView>> GetLeaveSummaryReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds)
        {
            return await leaveReportRepository.GetLeaveSummaryReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, leaveComponentIds, employeeIds);
        }

        public async Task<IEnumerable<LeaveDetailedReportView>> GetLeaveDetailedReportDetails(string reportType, DateTime fromDate, DateTime toDate, string paygroupIds, string designationIds, string locationIds, string departmentIds, string employeeCategory, string leaveComponentIds, string employeeIds)
        {
            return await leaveReportRepository.GetLeaveDetailedReportDetails(reportType, fromDate, toDate, paygroupIds, designationIds, locationIds, departmentIds, employeeCategory, leaveComponentIds, employeeIds);
        }
    }
}
