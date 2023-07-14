using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IBranchSignatoryService : IAsyncService<HRMSBranchSignatory>
{
    Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranch(int branchId);
}