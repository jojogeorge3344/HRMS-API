using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeSalaryConfigurationDetailsService : AsyncService, IEmployeeSalaryConfigurationDetailsService
    {
        private readonly IEmployeeSalaryConfigurationDetailsRepository employeeSalaryConfigurationDetailsRepository;

        public EmployeeSalaryConfigurationDetailsService(IEmployeeSalaryConfigurationDetailsRepository employeeSalaryConfigurationDetailsRepository)
        {
            this.employeeSalaryConfigurationDetailsRepository = employeeSalaryConfigurationDetailsRepository;
        }

        public async Task<int> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            return await employeeSalaryConfigurationDetailsRepository.InsertEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);
        }

        public async Task<int> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            return await employeeSalaryConfigurationDetailsRepository.UpdateEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);
        }

        public async Task<int> DeleteByEmployeeId(int employeeId)
        {
            return await employeeSalaryConfigurationDetailsRepository.DeleteByEmployeeId(employeeId);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeSalaryConfigurationDetailsRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeSalaryConfigurationDetails>> GetAllAsync()
        {
            return await employeeSalaryConfigurationDetailsRepository.GetAllAsync();
        }

        public async Task<EmployeeSalaryConfigurationDetails> GetAsync(int id)
        {
            return await employeeSalaryConfigurationDetailsRepository.GetAsync(id);
        }

        public async Task<EmployeeSalaryConfigurationDetails> InsertAsync(EmployeeSalaryConfigurationDetails employeeSalaryConfigurationDetails)
        {
            return await employeeSalaryConfigurationDetailsRepository.InsertAsync(employeeSalaryConfigurationDetails);
        }

        public async Task<int> UpdateAsync(EmployeeSalaryConfigurationDetails employeeSalaryConfigurationDetails)
        {
            return await employeeSalaryConfigurationDetailsRepository.UpdateAsync(employeeSalaryConfigurationDetails);
        }
    }
}
