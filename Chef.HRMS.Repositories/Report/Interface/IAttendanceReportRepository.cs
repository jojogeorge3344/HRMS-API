namespace Chef.HRMS.Repositories;

public interface IAttendanceReportRepository : IGenericRepository<AttendanceReportView>
{
    Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime startDate, DateTime endDate);
}
