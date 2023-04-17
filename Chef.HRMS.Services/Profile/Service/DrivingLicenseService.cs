using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DrivingLicenseService : AsyncService<DrivingLicense>, IDrivingLicenseService
    {
        private readonly IDrivingLicenseRepository drivingLicenseRepository;

        public DrivingLicenseService(IDrivingLicenseRepository drivingLicenseRepository)
        {
            this.drivingLicenseRepository = drivingLicenseRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            return drivingLicenseRepository.DeleteAsync(id);
        }

        public Task<IEnumerable<DrivingLicense>> GetAllAsync()
        {
            return drivingLicenseRepository.GetAllAsync();
        }

        public Task<DrivingLicense> GetAsync(int id)
        {
            return drivingLicenseRepository.GetAsync(id);
        }

        public Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId)
        {
            return drivingLicenseRepository.GetByEmployeeId(employeeId);
        }

        public Task<int> InsertAsync(DrivingLicense drivingLicense)
        {
            return drivingLicenseRepository.InsertAsync(drivingLicense);
        }

        public Task<int> UpdateAsync(DrivingLicense drivingLicense)
        {
            return drivingLicenseRepository.UpdateAsync(drivingLicense);
        }
    }
}