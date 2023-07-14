namespace Chef.HRMS.Repositories;

public class LogPayrollComponentConfigurationRepository : GenericRepository<LogPayrollComponentConfiguration>, ILogPayrollComponentConfigurationRepository
{
    public LogPayrollComponentConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<LogPayrollComponentConfiguration> GetPayrollComponentConfigLogDetails(int id)
    {
        var sql = @"SELECT * FROM hrms.logpayrollcomponentconfiguration
                        WHERE payrollcomponentconfigurationid = @id
                        AND isarchived = false";

        return await Connection.QueryFirstAsync<LogPayrollComponentConfiguration>(sql, new { id });
    }
}
