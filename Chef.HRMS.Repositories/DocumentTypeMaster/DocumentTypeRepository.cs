using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class DocumentTypeRepository : TenantRepository<Models.DocumentDetail>, IDocumentTypeRepository
{
    public DocumentTypeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<bool> IsDocumentCodeExist(string code)
    {
        if (await QueryFactory
       .Query<DocumentDetail>()
       .Where("code", code)
       .WhereNotArchived()
       .CountAsync<int>() > 0) return true;
        else return false;
    }
}
