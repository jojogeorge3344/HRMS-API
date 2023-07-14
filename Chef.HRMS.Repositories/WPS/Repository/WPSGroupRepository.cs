namespace Chef.HRMS.Repositories;

public class WPSGroupRepository : GenericRepository<WPSGroup>, IWPSGroupRepository
{
    public WPSGroupRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }


}
