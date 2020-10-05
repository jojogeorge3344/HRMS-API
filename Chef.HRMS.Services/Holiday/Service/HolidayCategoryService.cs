﻿using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class HolidayCategoryServices : AsyncService, IHolidayCategoryService
    {
        private readonly IHolidayCategoryRepository holidayCategoryRepository;

        public HolidayCategoryServices(IHolidayCategoryRepository holidayCategoryRepository)
        {
            this.holidayCategoryRepository = holidayCategoryRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await holidayCategoryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<int>> GetAllAssignedHolidayCategory()
        {
            return await holidayCategoryRepository.GetAllAssignedHolidayCategory();
        }

        public async Task<IEnumerable<HolidayCategory>> GetAllAsync()
        {
            return await holidayCategoryRepository.GetAllAsync();
        }

        public async Task<HolidayCategory> GetAsync(int id)
        {
            return await holidayCategoryRepository.GetAsync(id);
        }

        public async Task<HolidayCategory> InsertAsync(HolidayCategory holidayCategory)
        {
            return await holidayCategoryRepository.InsertAsync(holidayCategory);
        }

        public async Task<int> UpdateAsync(HolidayCategory holidayCategory)
        {
            return await holidayCategoryRepository.UpdateAsync(holidayCategory);
        }

        public async Task<bool> UpdateHolidayCategory(int id, bool isConfigured)
        {
            return await holidayCategoryRepository.UpdateHolidayCategory(id, isConfigured);
        }
    }
}