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
    public class EmployeeRevisionOldService : AsyncService<EmployeeRevisionOld>, IEmployeeRevisionOldService
    {
        private readonly IEmployeeRevisionOldRepository employeeRevisionOldRepository;
        private readonly IAuthService authService;

        public EmployeeRevisionOldService(IEmployeeRevisionOldRepository employeeRevisionOldRepository, IAuthService authService )
        {
            this.employeeRevisionOldRepository = employeeRevisionOldRepository;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRevisionOldRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevisionOld>> GetAllAsync()
        {
            return await employeeRevisionOldRepository.GetAllAsync();
        }

        public async Task<EmployeeRevisionOld> GetAsync(int id)
        {
            return await employeeRevisionOldRepository.GetAsync(id);
        }

        public new async Task<int> InsertAsync(EmployeeRevisionOld employeeRevisionOld)
        {
            return await employeeRevisionOldRepository.InsertAsync(employeeRevisionOld);
        }

        public async Task<int> UpdateAsync(EmployeeRevisionOld employeeRevisionOld)
        {
            return await employeeRevisionOldRepository.UpdateAsync(employeeRevisionOld);
        }
    }
}