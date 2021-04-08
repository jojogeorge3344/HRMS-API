using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IAttendanceReportService : IAsyncService<AttendanceReportView>
    {
        Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime startDate, DateTime endDate);
    }
}
