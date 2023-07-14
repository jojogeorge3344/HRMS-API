namespace Chef.HRMS.Repositories;

public class JobFilingRepository : GenericRepository<JobFiling>, IJobFilingRepository
{
    public JobFilingRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<JobFiling> GetByEmployeeId(int employeeId)
    {
        var sql = @"SELECT * FROM hrms.jobfiling where employeeid = @employeeId";

        return await Connection.QueryFirstAsync<JobFiling>(sql, new { employeeId });
    }

    public async Task<int> GetWeekendPolicyById(int employeeId)
    {

        string sql = @"SELECT weekoff FROM hrms.jobfiling where employeeid=@employeeid";

        return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeId });
    }
}