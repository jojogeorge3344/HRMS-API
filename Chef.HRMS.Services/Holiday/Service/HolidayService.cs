﻿using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class HolidayService : AsyncService<Holiday>, IHolidayService
    {
        private readonly IHolidayRepository holidayRepository;

        public HolidayService(IHolidayRepository holidayRepository)
        {
            this.holidayRepository = holidayRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await holidayRepository.DeleteAsync(id);
        }

        //public async Task<IEnumerable<Holiday>> GetAll()
        //{
        //    return await holidayRepository.GetAllAsync();
        //}

        public async Task<IEnumerable<Holiday>> GetAllAsync()
        {
            return await holidayRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId)
        {
            return await holidayRepository.GetAllByCategory(categoryId);
        }

        public async Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId)
        {
            return await holidayRepository.GetAllHolidaysByEmployee(employeeId);
        }

        public async Task<Holiday> GetAsync(int id)
        {
            return await holidayRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(Holiday holidayList)
        {
            return await holidayRepository.InsertAsync(holidayList);
        }

        public async Task<int> UpdateAsync(Holiday holidayList)
        {
            return await holidayRepository.UpdateAsync(holidayList);
        }
    }
}