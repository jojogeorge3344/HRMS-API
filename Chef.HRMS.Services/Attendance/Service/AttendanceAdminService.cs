using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class AttendanceAdminService : AsyncService<AttendanceAdminStatsView>, IAttendanceAdminService
{
    private readonly IAttendanceAdminRepository attendanceAdminRepository;

    public AttendanceAdminService(IAttendanceAdminRepository attendanceAdminRepository)
    {
        this.attendanceAdminRepository = attendanceAdminRepository;
    }

    public async Task<IEnumerable<AttendanceAdminStatsView>> GetTodaysAttendanceStats()
    {
        return await attendanceAdminRepository.GetTodaysAttendanceStats();
    }

    public async Task<IEnumerable<AttendanceAdminLogsView>> GetAttendanceLogs(DateTime fromDate, DateTime toDate)
    {
        return await attendanceAdminRepository.GetAttendanceLogs(fromDate, toDate);
    }

    public async Task<IEnumerable<AttendanceAdminLeaveLogsView>> GetLeaveLogs(DateTime fromDate, DateTime toDate)
    {
        return await attendanceAdminRepository.GetLeaveLogs(fromDate, toDate);
    }
    public async Task<int> AlreadyExistOrNot(DateTime fromDate, DateTime toDate, int employeeId)
    {
        return await attendanceAdminRepository.AlreadyExistOrNot(fromDate, toDate, employeeId);
    } 

    public async Task<IEnumerable<DateTime>> MarkedDates(string tablename, int employeeId)
    {
        return await attendanceAdminRepository.MarkedDates(tablename, employeeId);
    }
}
