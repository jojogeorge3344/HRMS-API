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

    public Task<int> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<AttendanceReportView>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<AttendanceReportView> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<AttendanceReportView>> GetAttendanceLogReport(DateTime startDate, DateTime endDate)
    {
        return await attendanceReportRepository.GetAttendanceLogReport(startDate, endDate);
    }

    public Task<AttendanceReportView> InsertAsync(AttendanceReportView obj)
    {
        throw new NotImplementedException();
    }

    public Task<int> UpdateAsync(AttendanceReportView obj)
    {
        throw new NotImplementedException();
    }
}
