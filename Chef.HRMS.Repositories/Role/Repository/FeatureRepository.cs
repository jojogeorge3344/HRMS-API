namespace Chef.HRMS.Repositories;

public class FeatureRepository : GenericRepository<Feature>, IFeatureRepository
{
    public FeatureRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}