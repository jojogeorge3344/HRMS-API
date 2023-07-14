namespace Chef.HRMS.Repositories;

public class LOPTrackerRepository : GenericRepository<LOPTracker>, ILOPTrackerRepository
{
    public LOPTrackerRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId)
    {
        var sql = @"SELECT * from hrms.calculate_LOP(@employeeId,@payrollProcessingMethodId) ";

        return await Connection.QueryFirstOrDefaultAsync<LossOfPayView>(sql, new { employeeId, payrollProcessingMethodId });
    }
}