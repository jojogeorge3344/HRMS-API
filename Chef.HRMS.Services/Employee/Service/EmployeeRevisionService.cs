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
    public class EmployeeRevisionService : AsyncService<EmployeeRevision>, IEmployeeRevisionService
    {
        private readonly IEmployeeRevisionRepository employeeRevisionRepository;
        private readonly IAuthService authService;

        public EmployeeRevisionService(IEmployeeRevisionRepository employeeRevisionRepository, IAuthService authService )
        {
            this.employeeRevisionRepository = employeeRevisionRepository;
            this.authService = authService;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await employeeRevisionRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<EmployeeRevision>> GetAllAsync()
        {
            return await employeeRevisionRepository.GetAllAsync();
        }

        public async Task<EmployeeRevision> GetAsync(int id)
        {
            return await employeeRevisionRepository.GetAsync(id);
        }

        public new async Task<int> InsertAsync(EmployeeRevision employeeRevision)
        {
            return await employeeRevisionRepository.InsertAsync(employeeRevision);
        }

        public async Task<int> UpdateAsync(EmployeeRevision employeeRevision)
        {
            return await employeeRevisionRepository.UpdateAsync(employeeRevision);
        }
    }
}