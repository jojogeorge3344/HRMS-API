using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILeaveStructureService:IAsyncService<LeaveStructure>
    {
        Task<IEnumerable<int>> GetAllAssignedLeaveStructure();
        Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures();
        Task<int> UpdateLeaveStructure(int id,bool isConfigured);
    }
}
