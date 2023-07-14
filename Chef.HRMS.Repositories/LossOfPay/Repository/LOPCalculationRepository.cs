namespace Chef.HRMS.Repositories;

public class LOPCalculationRepository : GenericRepository<LOPCalculation>, ILOPCalculationRepository
{
    public LOPCalculationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}