using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeaveSlabService : IAsyncService<LeaveSlab>
{
    Task<IEnumerable<LeaveSlab>> GetLeaveComponentDetails(int leavecomponentid);
}
