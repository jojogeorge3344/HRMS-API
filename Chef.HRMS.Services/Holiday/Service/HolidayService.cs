using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class HolidayService : AsyncService, IHolidayService
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

        public Task<IEnumerable<Holiday>> GetAllAsync()
        {
            throw new NotImplementedException();
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

        public async Task<Holiday> InsertAsync(Holiday holidayList)
        {
            return await holidayRepository.InsertAsync(holidayList);
        }

        public async Task<int> UpdateAsync(Holiday holidayList)
        {
            return await holidayRepository.UpdateAsync(holidayList);
        }
    }
}