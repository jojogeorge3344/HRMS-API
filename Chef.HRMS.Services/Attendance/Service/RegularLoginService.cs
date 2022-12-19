using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class RegularLoginService : IRegularLoginService
    {
        private readonly IRegularLoginRepository regularLoginRepository;

        public RegularLoginService(IRegularLoginRepository regularLoginRepository)
        {
            this.regularLoginRepository = regularLoginRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await regularLoginRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<RegularLogin>> GetAllAsync()
        {
            return await regularLoginRepository.GetAllAsync();
        }

        public async Task<IEnumerable<RegularLogin>> GetAllAttendanceById(int employeeId)
        {
            return await regularLoginRepository.GetAllAttendanceById(employeeId);
        }

        public async Task<RegularLogin> GetAsync(int id)
        {
            return await regularLoginRepository.GetAsync(id);
        }

        public async Task<IEnumerable<UserAttendanceViewModel>> GetAttendanceLog(int employeeId, DateTime startDate, DateTime endDate)
        {
            return await regularLoginRepository.GetAttendanceLog(employeeId, startDate, endDate);
        }

        public async Task<decimal> GetAverageAttendanceById(int employeeId, int requestType)
        {
            return await regularLoginRepository.GetAverageAttendanceById(employeeId, requestType);
        }

        public async Task<decimal> GetAverageOnTimeDetails(int employeeId, int requestType)
        {
            return await regularLoginRepository.GetAverageOnTimeDetails(employeeId, requestType);
        }

        public async Task<int> InsertAsync(RegularLogin regularLogin)
        {
            return await regularLoginRepository.InsertAsync(regularLogin);
        }

        public async Task<int> UpdateAsync(RegularLogin regularLogin)
        {
            return await regularLoginRepository.UpdateAsync(regularLogin);
        }
    }
}
