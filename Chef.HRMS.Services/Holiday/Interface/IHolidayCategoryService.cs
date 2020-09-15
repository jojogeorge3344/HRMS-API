using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IHolidayCategoryService : IAsyncService<HolidayCategory>
    {
        Task<IEnumerable<int>> GetAllAssignedHolidayCategory();
        Task<bool> UpdateHolidayCategory(int id, bool isConfigured);

    }
}