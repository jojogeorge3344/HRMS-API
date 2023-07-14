namespace Chef.HRMS.Repositories;

public class EmployeeLetterDocumentRepository : GenericRepository<EmployeeLetterDocument>, IEmployeeLetterDocumentRepository
{
    public EmployeeLetterDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
