using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class AttendanceReportService : AsyncService<AttendanceReportView>, IAttendanceReportService
{
    private readonly IAttendanceReportRepository attendanceReportRepository;

    public AttendanceReportService(IAttendanceReportRepository attendanceReportRepository)
    {
        this.attendanceReportRepository = attendanceReportRepository;
    }

    public async Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime startDate, DateTime endDate)
    {
        return await attendanceReportRepository.GetAttendanceLogReport(startDate, endDate);
    }
}
