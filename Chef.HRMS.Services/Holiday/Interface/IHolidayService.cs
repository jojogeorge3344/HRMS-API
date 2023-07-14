using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IHolidayService : IAsyncService<Holiday>
{
    Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId);

    Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId);

    //Task<IEnumerable<Holiday>> GetAll();
}