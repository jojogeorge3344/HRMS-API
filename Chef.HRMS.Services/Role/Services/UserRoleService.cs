using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

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

    public async Task<IEnumerable<UserRoleView>> GetUserRole(string userId)
    {
        return await userRoleRepository.GetUserRole(userId);
    }

    public async Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole)
    {
        return await userRoleRepository.UpdateUserRoleGroup(roleId, userRole);
    }
}