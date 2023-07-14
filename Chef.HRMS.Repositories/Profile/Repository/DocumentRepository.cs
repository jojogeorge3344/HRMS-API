using Document = Chef.HRMS.Models.Document;

namespace Chef.HRMS.Repositories;

public class DocumentRepository : TenantRepository<Document>, IDocumentRepository
{
    public DocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}