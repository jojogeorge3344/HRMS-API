using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IShiftRepository : IGenericRepository<Shift>
    {
        Task<IEnumerable<int>> GetAllAssignedShift();
        Task<Shift> GetShiftByEmployeeId(int employeeId);
    }
}
