using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class BranchSignatoryService : AsyncService<HRMSBranchSignatory>, IBranchSignatoryService
{
    private readonly IBranchSignatoryRepository branchSignatoryRepository;

    public BranchSignatoryService(IBranchSignatoryRepository branchSignatoryRepository)
    {
        this.branchSignatoryRepository = branchSignatoryRepository;
    }

    public async Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranch(int branchId)
    {
        return await branchSignatoryRepository.GetAllByBranchAsync(branchId);
    }
}