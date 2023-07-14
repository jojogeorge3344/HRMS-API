namespace Chef.HRMS.Repositories;

public class VisaDesignationRepository : TenantRepository<VisaDesignation>, IVisaDesignationRepository
{
    public VisaDesignationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
}
