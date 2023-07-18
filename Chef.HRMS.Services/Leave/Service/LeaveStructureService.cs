using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveStructureService : AsyncService<LeaveStructure>, ILeaveStructureService
{
    private readonly ILeaveStructureRepository leaveStructureRepository;

    public LeaveStructureService(ILeaveStructureRepository leaveStructureRepository)
    {
        this.leaveStructureRepository = leaveStructureRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedLeaveStructure()
    {
        return await leaveStructureRepository.GetAllAssignedLeaveStructure();
    }

    public async Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures()
    {
        return await leaveStructureRepository.GetAllConfiguredLeaveStructures();
    }

    public async Task<int> UpdateLeaveStructure(int id, bool isConfigured)
    {
        return await leaveStructureRepository.UpdateLeaveStructure(id, isConfigured);
    }
}
