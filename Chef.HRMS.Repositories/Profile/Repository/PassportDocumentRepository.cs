namespace Chef.HRMS.Repositories;

public class PassportDocumentRepository : GenericRepository<PassportDocument>, IPassportDocumentRepository
{
    public PassportDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
