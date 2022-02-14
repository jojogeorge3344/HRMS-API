using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IAttendanceAdminRepository : IGenericRepository<AttendanceAdminStatsView>
    {
        public Task<IEnumerable<AttendanceAdminStatsView>> GetTodaysAttendanceStats();

        public Task<IEnumerable<AttendanceAdminLogsView>> GetAttendanceLogs(DateTime fromDate, DateTime toDate);

        public Task<IEnumerable<AttendanceAdminLeaveLogsView>> GetLeaveLogs(DateTime fromDate, DateTime toDate);

        public Task<int> AlreadyExistOrNot(DateTime fromDate, DateTime toDate, int employeeId);
        public Task<IEnumerable<Leave>> MarkedDates(string tablename, int employeeId);
    }
}
