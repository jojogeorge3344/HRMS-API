namespace Chef.HRMS.Repositories;

public class EmployeeDefaultsRepository : GenericRepository<EmployeeDefaults>, IEmployeeDefaultsRepository
{
    public EmployeeDefaultsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}