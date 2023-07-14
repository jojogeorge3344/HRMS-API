using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeaveStructureLeaveComponentService : IAsyncService<LeaveStructureLeaveComponent>
{

    Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent);

    Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId);

    Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents);
    Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents);
}