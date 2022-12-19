using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UserRoleService : AsyncService<UserRole>, IUserRoleService
    {
        private readonly IUserRoleRepository userRoleRepository;

        public UserRoleService(IUserRoleRepository userRoleRepository)
        {
            this.userRoleRepository = userRoleRepository;
        }

        public async Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole)
        {
            return await userRoleRepository.AssignRolesToUser(userRole);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await userRoleRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<UserRole>> GetAllAsync()
        {
            return await userRoleRepository.GetAllAsync();
        }

        public async Task<UserRole> GetAsync(int id)
        {
            return await userRoleRepository.GetAsync(id);
        }

        public async Task<IEnumerable<UserRoleView>> GetUserRole(int employeeId)
        {
            return await userRoleRepository.GetUserRole(employeeId);
        }

        public async Task<int> InsertAsync(UserRole userRole)
        {
            return await userRoleRepository.InsertAsync(userRole);
        }

        public async Task<int> UpdateAsync(UserRole userRole)
        {
            return await userRoleRepository.UpdateAsync(userRole);
        }

        public async Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole)
        {
            return await userRoleRepository.UpdateUserRoleGroup(roleId, userRole);
        }
    }
}