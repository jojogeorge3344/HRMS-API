namespace Chef.HRMS.Repositories;

public class PayrollSystemVariableRepository : GenericRepository<PayrollSystemVariable>, IPayrollSystemVariableRepository
{
    public PayrollSystemVariableRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
