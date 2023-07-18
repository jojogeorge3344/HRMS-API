using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class BranchService : AsyncService<HRMSBranch>, IBranchService
{
    private readonly IBranchRepository branchRepository;

    public BranchService(IBranchRepository branchRepository)
    {
        this.branchRepository = branchRepository;
    }
}