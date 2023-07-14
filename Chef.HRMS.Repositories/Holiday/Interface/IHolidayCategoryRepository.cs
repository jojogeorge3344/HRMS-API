namespace Chef.HRMS.Repositories;

public interface IHolidayCategoryRepository : IGenericRepository<HolidayCategory>
{
    Task<IEnumerable<int>> GetAllAssignedHolidayCategory();
    Task<bool> UpdateHolidayCategory(int id, bool isConfigured);
}