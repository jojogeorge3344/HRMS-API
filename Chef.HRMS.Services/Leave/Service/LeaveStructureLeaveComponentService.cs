using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveStructureLeaveComponentService : AsyncService<LeaveStructureLeaveComponent>, ILeaveStructureLeaveComponentService
{
    private readonly ILeaveStructureLeaveComponentRepository leaveStructureLeaveComponentRepository;

    public LeaveStructureLeaveComponentService(ILeaveStructureLeaveComponentRepository leaveStructureLeaveComponentRepository)
    {
        this.leaveStructureLeaveComponentRepository = leaveStructureLeaveComponentRepository;
    }

    public async Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
    {
        return await leaveStructureLeaveComponentRepository.DeleteAsync(leaveStructureLeaveComponent);
    }

    public async Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId)
    {
        return await leaveStructureLeaveComponentRepository.GetAllAsync(leaveStructureId);
    }

    public async Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents)
    {
        return await leaveStructureLeaveComponentRepository.InsertAsync(leaveStructureId, leaveStructureLeaveComponents, removeLeaveStructureLeaveComponents);
    }

    public async Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents)
    {
        return await leaveStructureLeaveComponentRepository.UpdateAsync(leaveStructureId, leaveStructureLeaveComponents);
    }
}