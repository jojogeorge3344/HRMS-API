namespace Chef.HRMS.Repositories;

public class UniqueIdentificationDocumentRepository : GenericRepository<UniqueIdentificationDocument>, IUniqueIdentificationDocumentRepository
{
    public UniqueIdentificationDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
