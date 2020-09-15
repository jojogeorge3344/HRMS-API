using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IHolidayRepository : IGenericRepository<Holiday>
    {
        Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId);

        Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId);
    }
}