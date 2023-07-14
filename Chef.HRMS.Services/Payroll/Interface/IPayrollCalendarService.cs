using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollCalendarService : IAsyncService<PayrollCalendar>
{
    Task<bool> IsDuplicateValueExists(string name);
    Task<IEnumerable<int>> GetAllAssignedPayCalendar();
    Task<IEnumerable<WeekofDateList>> GetStartDateAndEndDate(string weekstart, string weekend);
    Task<IEnumerable<WeekOff>> GetWeekOff();
}
