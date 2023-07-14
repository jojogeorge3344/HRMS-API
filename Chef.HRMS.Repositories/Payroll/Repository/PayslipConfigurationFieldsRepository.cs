namespace Chef.HRMS.Repositories;

public class PayslipConfigurationFieldsRepository : GenericRepository<PayslipConfigurationFields>, IPayslipConfigurationFieldsRepository
{
    public PayslipConfigurationFieldsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<int> UpdatePayslipConfigurationFieldsAsync(IEnumerable<PayslipConfigurationFields> payslipConfigurationFields)
    {
        var sql = new QueryBuilder<PayslipConfigurationFields>().GenerateUpdateQuery();

        return await Connection.ExecuteAsync(sql, payslipConfigurationFields);
    }
}
