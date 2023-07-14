namespace Chef.HRMS.Repositories;

public class BonusTypeRepository : GenericRepository<BonusType>, IBonusTypeRepository
{
    public BonusTypeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
