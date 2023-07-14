namespace Chef.HRMS.Repositories;

public class SystemVariableRepository : TenantRepository<SystemVariable>, ISystemVariableRepository
{
    public SystemVariableRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
}
