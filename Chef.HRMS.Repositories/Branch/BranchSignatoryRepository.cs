namespace Chef.HRMS.Repositories;

public class BranchSignatoryRepository : GenericRepository<HRMSBranchSignatory>, IBranchSignatoryRepository
{
    public BranchSignatoryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranchAsync(int branchId)
    {

        var sql = "SELECT * FROM  hrms.hrmsbranchsignatory WHERE branchid = @branchid";
        return await Connection.QueryAsync<HRMSBranchSignatory>(sql, new { branchid = branchId });
    }
}