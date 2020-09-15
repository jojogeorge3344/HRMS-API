using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeService : AsyncService, IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await employeeRepository.GetAllAsync();
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails()
        {
            return await employeeRepository.GetAllEmployeeDetails();
        }

        public async Task<Employee> GetAsync(int id)
        {
            return await employeeRepository.GetAsync(id);
        }

        public async Task<Employee> InsertAsync(Employee employee)
        {
            return await employeeRepository.InsertAsync(employee);
        }

        public async Task<int> UpdateAsync(Employee employee)
        {
            return await employeeRepository.UpdateAsync(employee);
        }

        public async Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId)
        {
            return await employeeRepository.GetEmployeeDetailsByJobTile(jobTitleId);
        }

        public async Task<EmployeeView> GetEmployeeDetailsById(int employeeId)
        {
            return await employeeRepository.GetEmployeeDetailsById(employeeId);
        }
        public async Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId)
        {
            return await employeeRepository.GetAllNotificationById(employeeId);
        }
    }
}