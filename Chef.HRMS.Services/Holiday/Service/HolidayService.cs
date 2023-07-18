using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class HolidayService : AsyncService<Holiday>, IHolidayService
{
    private readonly IHolidayRepository holidayRepository;

    public HolidayService(IHolidayRepository holidayRepository)
    {
        this.holidayRepository = holidayRepository;
    }

    public async Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId)
    {
        return await holidayRepository.GetAllByCategory(categoryId);
    }

    public async Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId)
    {
        return await holidayRepository.GetAllHolidaysByEmployee(employeeId);
    }
}