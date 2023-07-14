namespace Chef.HRMS.Repositories;

public class PANDocumentRepository : GenericRepository<PANDocument>, IPANDocumentRepository
{
    public PANDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
