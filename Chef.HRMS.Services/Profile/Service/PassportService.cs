using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class PassportService : AsyncService<Passport>, IPassportService
    {
        private readonly IPassportRepository passportRepository;

        public PassportService(IPassportRepository passportRepository)
        {
            this.passportRepository = passportRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return passportRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<Passport>> GetAllAsync()
        {
            return passportRepository.GetAllAsync();
        }

        public Task<Passport> GetAsync(int id)
        {
            return passportRepository.GetAsync(id);
        }

        public Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId)
        {
            return passportRepository.GetByEmployeeId(employeeId);
        }

        public Task<int> InsertAsync(Passport passport)
        {
            return passportRepository.InsertAsync(passport);
        }

        public Task<int> UpdateAsync(Passport passport)
        {
            return passportRepository.UpdateAsync(passport);
        }
    }
}