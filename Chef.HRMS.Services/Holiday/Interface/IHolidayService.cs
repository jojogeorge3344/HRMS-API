using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IHolidayService : IAsyncService<Holiday>
    {
        Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId);

        Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId);

        //Task<IEnumerable<Holiday>> GetAll();
    }
}