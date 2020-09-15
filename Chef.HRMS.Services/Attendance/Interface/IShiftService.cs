using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IShiftService : IAsyncService<Shift>
    {
        Task<IEnumerable<int>> GetAllAssignedShift();
        Task<Shift> GetShiftByEmployeeId(int employeeId);
    }
}
