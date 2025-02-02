﻿using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IHolidayCategoryService : IAsyncService<HolidayCategory>
{
    Task<IEnumerable<int>> GetAllAssignedHolidayCategory();
    Task<bool> UpdateHolidayCategory(int id, bool isConfigured);

}