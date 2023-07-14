using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class CategoryService : AsyncService<Category>, ICategoryService
{
    private readonly ICategoryRepository categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        this.categoryRepository = categoryRepository;
    }

    public async Task<bool> IsCategoryCodeExist(string code)
    {
        return await categoryRepository.IsCategoryCodeExist(code);
    }
}
