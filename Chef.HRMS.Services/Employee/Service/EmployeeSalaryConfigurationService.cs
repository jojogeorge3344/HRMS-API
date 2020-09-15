using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeSalaryConfigurationService : AsyncService, IEmployeeSalaryConfigurationService
    {
        private readonly IEmployeeSalaryConfigurationRepository employeeSalaryConfigurationRepository;

        public EmployeeSalaryConfigurationService(IEmployeeSalaryConfigurationRepository employeeSalaryConfigurationRepository)
        {
            this.employeeSalaryConfigurationRepository = employeeSalaryConfigurationRepository;
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId)
        {
            return await employeeSalaryConfigurationRepository.GetSalaryConfigurationByEmployeeId(employeeId);
        }

        public async Task<int> DeleteByEmployeeId(int employeeId)
        {
            return await employeeSalaryConfigurationRepository.DeleteByEmployeeId(employeeId);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeSalaryConfigurationRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeSalaryConfiguration>> GetAllAsync()
        {
            return await employeeSalaryConfigurationRepository.GetAllAsync();
        }

        public async Task<EmployeeSalaryConfiguration> GetAsync(int id)
        {
            return await employeeSalaryConfigurationRepository.GetAsync(id);
        }

        public async Task<EmployeeSalaryConfiguration> InsertAsync(EmployeeSalaryConfiguration employeeSalaryConfiguration)
        {
            return await employeeSalaryConfigurationRepository.InsertAsync(employeeSalaryConfiguration);
        }

        public async Task<int> UpdateAsync(EmployeeSalaryConfiguration employeeSalaryConfiguration)
        {
            return await employeeSalaryConfigurationRepository.UpdateAsync(employeeSalaryConfiguration);
        }
    }
}
