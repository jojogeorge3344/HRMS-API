using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IUserRoleRepository : IGenericRepository<UserRole>
    {
        Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole);
        Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole);
        Task<IEnumerable<UserRoleView>> GetUserRole(string userId);
    }
}