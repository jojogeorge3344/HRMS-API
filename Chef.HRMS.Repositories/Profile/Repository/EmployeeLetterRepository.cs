namespace Chef.HRMS.Repositories;

public class EmployeeLetterRepository : GenericRepository<EmployeeLetter>, IEmployeeLetterRepository
{
    public EmployeeLetterRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}