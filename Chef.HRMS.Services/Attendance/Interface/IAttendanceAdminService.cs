using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IAttendanceAdminService : IAsyncService<AttendanceAdminStatsView>
{
    public Task<IEnumerable<AttendanceAdminStatsView>> GetTodaysAttendanceStats();

    public Task<IEnumerable<AttendanceAdminLogsView>> GetAttendanceLogs(DateTime fromDate, DateTime toDate);

    public Task<IEnumerable<AttendanceAdminLeaveLogsView>> GetLeaveLogs(DateTime fromDate, DateTime toDate);

    public Task<int> AlreadyExistOrNot(DateTime fromDate, DateTime toDate, int employeeId);

    public Task<IEnumerable<DateTime>> MarkedDates(string tablename, int employeeId);

}
