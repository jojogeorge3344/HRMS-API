using Chef.Common.Core.Services;

namespace Chef.HRMS.Repositories;

public interface ICategoryRepository : IAsyncService<Category>
{
    Task<bool> IsCategoryCodeExist(string code);

}
