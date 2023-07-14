using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ICategoryService : IAsyncService<Category>
{
    Task<bool> IsCategoryCodeExist(string code);
}
