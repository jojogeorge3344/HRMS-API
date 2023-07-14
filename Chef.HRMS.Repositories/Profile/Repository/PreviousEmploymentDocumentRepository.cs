namespace Chef.HRMS.Repositories;

public class PreviousEmploymentDocumentRepository : GenericRepository<PreviousEmploymentDocument>, IPreviousEmploymentDocumentRepository
{
    public PreviousEmploymentDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}