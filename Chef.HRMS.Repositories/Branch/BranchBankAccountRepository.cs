namespace Chef.HRMS.Repositories;

public class BranchBankAccountRepository : GenericRepository<HRMSBranchBankAccount>, IBranchBankAccountRepository
{
    public BranchBankAccountRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId)
    {

        var sql = "SELECT * FROM  hrms.hrmsbranchbankaccount WHERE branchid = @Id";
        return await Connection.QueryAsync<HRMSBranchBankAccount>(sql, new { Id = branchId });
    }
}