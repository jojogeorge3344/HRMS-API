namespace Chef.HRMS.Repositories;

public class PayslipConfigurationRepository : GenericRepository<PayslipConfiguration>, IPayslipConfigurationRepository
{
    public PayslipConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
