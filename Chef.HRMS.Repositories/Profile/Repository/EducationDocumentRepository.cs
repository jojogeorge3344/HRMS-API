namespace Chef.HRMS.Repositories;

public class EducationDocumentRepository : GenericRepository<EducationDocument>, IEducationDocumentRepository
{
    public EducationDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}