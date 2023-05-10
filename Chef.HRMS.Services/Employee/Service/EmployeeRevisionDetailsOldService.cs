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
    public class EmployeeRevisionDetailsOldService : AsyncService<EmployeeRevisionDetailsOld>, IEmployeeRevisionDetailsOldService
    {
        private readonly IEmployeeRevisionDetailsOldRepository employeeRevisionDetailsOldRepository;
        private readonly IAuthService authService;

        public EmployeeRevisionDetailsOldService(IEmployeeRevisionDetailsOldRepository employeeRevisionDetailsOldRepository, IAuthService authService )
        {
            this.employeeRevisionDetailsOldRepository = employeeRevisionDetailsOldRepository;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRevisionDetailsOldRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevisionDetailsOld>> GetAllAsync()
        {
            return await employeeRevisionDetailsOldRepository.GetAllAsync();
        }

        public async Task<EmployeeRevisionDetailsOld> GetAsync(int id)
        {
            return await employeeRevisionDetailsOldRepository.GetAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevisionDetailsOld>> GetOldEmployeeRevisionSalaryDetail(int employeeRevisionId)
        {
            return await employeeRevisionDetailsOldRepository.GetOldEmployeeRevisionSalaryDetail(employeeRevisionId);
        }

        public new async Task<int> InsertAsync(EmployeeRevisionDetailsOld employeeRevisionDetailsOld)
        {
            return await employeeRevisionDetailsOldRepository.InsertAsync(employeeRevisionDetailsOld);
        }

        public async Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld)
        {
            return await employeeRevisionDetailsOldRepository.UpdateAsync(employeeRevisionDetailsOld);
        }
    }
}