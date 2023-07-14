namespace Chef.HRMS.Repositories;

public interface IPayrollCalendarRepository : IGenericRepository<PayrollCalendar>
{
    Task<bool> IsDuplicateValueExists(string name);
    Task<IEnumerable<int>> GetAllAssignedPayCalendar();
    Task<IEnumerable<WeekofDateList>> GetStartDateAndEndDate(string weekstart, string weekend);
    Task<IEnumerable<WeekOff>> GetWeekOff();

}
