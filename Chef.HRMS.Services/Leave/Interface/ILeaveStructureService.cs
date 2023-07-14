using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeaveStructureService : IAsyncService<LeaveStructure>
{
    Task<IEnumerable<int>> GetAllAssignedLeaveStructure();
    Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures();
    Task<int> UpdateLeaveStructure(int id, bool isConfigured);
}
