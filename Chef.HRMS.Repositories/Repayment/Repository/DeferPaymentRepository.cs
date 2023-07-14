namespace Chef.HRMS.Repositories;

public class DeferPaymentRepository : GenericRepository<DeferPayment>, IDeferPaymentRepository
{
    public DeferPaymentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
