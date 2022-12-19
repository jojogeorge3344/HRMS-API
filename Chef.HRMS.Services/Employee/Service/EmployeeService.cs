using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeService : AsyncService<HRMSEmployee>, IEmployeeService
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

        public async Task<IEnumerable<HRMSEmployee>> GetAllAsync()
        {
            return await employeeRepository.GetAllAsync();
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails()
        {
            return await employeeRepository.GetAllEmployeeDetails();
        }

        public async Task<HRMSEmployee> GetAsync(int id)
        {
            return await employeeRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(HRMSEmployee employee)
        {
            return await employeeRepository.InsertAsync(employee);
        }

        public async Task<int> UpdateAsync(HRMSEmployee employee)
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