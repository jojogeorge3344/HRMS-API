using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IUserRoleService : IAsyncService<UserRole>
{
    Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole);
    Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole);
    Task<IEnumerable<UserRoleView>> GetUserRole(string userId);
}