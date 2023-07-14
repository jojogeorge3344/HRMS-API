namespace Chef.HRMS.Repositories.EmployeeEncashment;

public class EmployeeEncashmentFindTLSRepository : TenantRepository<Chef.HRMS.Models.EmployeeEncashmentFindTLS>, IEmployeeEncashmentFindTLSRepository
{
    public EmployeeEncashmentFindTLSRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
}
