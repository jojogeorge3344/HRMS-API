using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class HolidayCategoryServices : AsyncService<HolidayCategory>, IHolidayCategoryService
{
    private readonly IHolidayCategoryRepository holidayCategoryRepository;

    public HolidayCategoryServices(IHolidayCategoryRepository holidayCategoryRepository)
    {
        this.holidayCategoryRepository = holidayCategoryRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedHolidayCategory()
    {
        return await holidayCategoryRepository.GetAllAssignedHolidayCategory();
    }

    public async Task<bool> UpdateHolidayCategory(int id, bool isConfigured)
    {
        return await holidayCategoryRepository.UpdateHolidayCategory(id, isConfigured);
    }
}