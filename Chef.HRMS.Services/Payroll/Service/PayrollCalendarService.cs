using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class PayrollCalendarService : AsyncService<PayrollCalendar>, IPayrollCalendarService
{
    private readonly IPayrollCalendarRepository payrollCalendarRepository;

    public PayrollCalendarService(IPayrollCalendarRepository payrollCalendarRepository)
    {
        this.payrollCalendarRepository = payrollCalendarRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await payrollCalendarRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<PayrollCalendar>> GetAllAsync()
    {
        return await payrollCalendarRepository.GetAllAsync();
    }

    public async Task<PayrollCalendar> GetAsync(int id)
    {
        return await payrollCalendarRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(PayrollCalendar payrollCalendar)
    {
        return await payrollCalendarRepository.InsertAsync(payrollCalendar);
    }

    public async Task<bool> IsDuplicateValueExists(string name)
    {
        return await payrollCalendarRepository.IsDuplicateValueExists(name);
    }

    public async Task<int> UpdateAsync(PayrollCalendar payrollCalendar)
    {
        return await payrollCalendarRepository.UpdateAsync(payrollCalendar);
    }
    public async Task<IEnumerable<int>> GetAllAssignedPayCalendar()
    {
        return await payrollCalendarRepository.GetAllAssignedPayCalendar();
    }

    public async Task<IEnumerable<WeekofDateList>> GetStartDateAndEndDate(string weekstart, string weekend)
    {
        var dates = await payrollCalendarRepository.GetStartDateAndEndDate(weekstart, weekend);

        return dates;
    }

    public async Task<IEnumerable<WeekOff>> GetWeekOff()
    {
        return await payrollCalendarRepository.GetWeekOff();
    }
}
