using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IAttendanceReportService : IAsyncService<AttendanceReportView>
{
    Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime startDate, DateTime endDate);
}
