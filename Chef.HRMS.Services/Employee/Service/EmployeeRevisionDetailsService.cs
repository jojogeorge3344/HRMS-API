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
    public class EmployeeRevisionDetailsService : AsyncService<EmployeeRevisionDetails>, IEmployeeRevisionDetailsService
    {
        private readonly IEmployeeRevisionDetailsRepository employeeRevisionDetailsRepository;
        private readonly IAuthService authService;

        public EmployeeRevisionDetailsService(IEmployeeRevisionDetailsRepository employeeRevisionDetailsRepository, IAuthService authService )
        {
            this.employeeRevisionDetailsRepository = employeeRevisionDetailsRepository;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRevisionDetailsRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevisionDetails>> GetAllAsync()
        {
            return await employeeRevisionDetailsRepository.GetAllAsync();
        }

        public async Task<EmployeeRevisionDetails> GetAsync(int id)
        {
            return await employeeRevisionDetailsRepository.GetAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevisionDetails>> GetEmployeeRevisionSalaryDetail(int employeeRevisionId)
        {
            return await employeeRevisionDetailsRepository.GetEmployeeRevisionSalaryDetail(employeeRevisionId);
        }

        public async Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId,int employee)
        {
            return await employeeRevisionDetailsRepository.GetEmployeeRevisionSalaryDetails(payrollStructureId, employee);
        }

        public new async Task<int> InsertAsync(EmployeeRevisionDetails employeeRevisionDetails)
        {
            return await employeeRevisionDetailsRepository.InsertAsync(employeeRevisionDetails);
        }

        public async Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails)
        {
            return await employeeRevisionDetailsRepository.UpdateAsync(employeeRevisionDetails);
        }
    }
}