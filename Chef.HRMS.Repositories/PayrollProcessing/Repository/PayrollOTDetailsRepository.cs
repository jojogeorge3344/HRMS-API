namespace Chef.HRMS.Repositories;

public class PayrollOTDetailsRepository : GenericRepository<PayrollOTDetails>, IPayrollOTDetailsRepository
{
    public PayrollOTDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
}
