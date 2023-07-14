using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class CategoryRepository : TenantRepository<Category>, ICategoryRepository
{
    public CategoryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }
    public async Task<bool> IsCategoryCodeExist(string code)
    {
        if (await QueryFactory
       .Query<Category>()
       .Where("code", code)
       .WhereNotArchived()
       .CountAsync<int>() > 0) return true;
        else return false;
    }
}
