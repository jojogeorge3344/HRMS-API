using Chef.Common.Authentication.Models;
using Chef.Common.Authentication.Repositories;
using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class EmployeeService : AsyncService<HRMSEmployee>, IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;
        private readonly IAuthService authService;

        public EmployeeService(IEmployeeRepository employeeRepository, IAuthService authService )
        {
            this.employeeRepository = employeeRepository;
            this.authService = authService;
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

        public new async Task<int> InsertAsync(HRMSEmployee employee)
        {
            var registerDto = new RegisterDto
            {
                Email = employee.Email,
                FirstName = employee.FirstName,
                IsActive = true,
                LastName = employee.LastName,
                Password = "FFFF1" + employee.FirstName + "@@@@",
                TimeZone = "5.30",
                Username = employee.FirstName
            };

            if ((await authService.RegisterUser(registerDto)).Succeeded)
            {
                var user = await authService.GetUser(employee.FirstName);
                employee.UserId = user.Id;
                employee.Id = await employeeRepository.InsertAsync(employee);
            }
            else
            {
                employee.Id = await employeeRepository.InsertAsync(employee);
            }
            return employee.Id;
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

        public async Task<bool> IsNameExist(string name)
        {
           return await employeeRepository.IsNameExist(name);
        }
    }
}