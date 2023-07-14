namespace Chef.HRMS.Repositories;

public class BranchRepository : GenericRepository<HRMSBranch>, IBranchRepository
{
    public BranchRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}