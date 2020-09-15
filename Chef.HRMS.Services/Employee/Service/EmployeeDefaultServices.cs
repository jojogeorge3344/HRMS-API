using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeDefaultServices : AsyncService, IEmployeeDefaultsServices
    {
        private readonly IEmployeeDefaultsRepository employeeDefaultRepository;

        public EmployeeDefaultServices(IEmployeeDefaultsRepository employeeDefaultRepository)
        {
            this.employeeDefaultRepository = employeeDefaultRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeDefaultRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeDefaults>> GetAllAsync()
        {
            return await employeeDefaultRepository.GetAllAsync();
        }

        public async Task<EmployeeDefaults> GetAsync(int id)
        {
            return await employeeDefaultRepository.GetAsync(id);
        }

        public async Task<EmployeeDefaults> InsertAsync(EmployeeDefaults employeeDefaults)
        {
            return await employeeDefaultRepository.InsertAsync(employeeDefaults);
        }

        public async Task<int> UpdateAsync(EmployeeDefaults employeeDefaults)
        {
            return await employeeDefaultRepository.UpdateAsync(employeeDefaults);
        }
    }
}