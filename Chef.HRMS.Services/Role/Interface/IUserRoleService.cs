using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IUserRoleService : IAsyncService<UserRole>
    {
        Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole);
        Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole);
        Task<IEnumerable<UserRoleView>> GetUserRole(int employeeId);
    }
}