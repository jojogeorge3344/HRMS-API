using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveStructureRepository : IGenericRepository<LeaveStructure>
    {
        Task<IEnumerable<int>> GetAllAssignedLeaveStructure();
        Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures();
        Task<int> UpdateLeaveStructure(int id,bool isConfigured);
    }
}