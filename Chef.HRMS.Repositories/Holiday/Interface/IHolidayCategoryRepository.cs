using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IHolidayCategoryRepository : IGenericRepository<HolidayCategory>
    {
        Task<IEnumerable<int>> GetAllAssignedHolidayCategory();
        Task<bool> UpdateHolidayCategory(int id, bool isConfigured);
    }
}