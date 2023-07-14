namespace Chef.HRMS.Repositories;

public interface IUserRoleRepository : IGenericRepository<UserRole>
{
    Task<int> AssignRolesToUser(IEnumerable<UserRole> userRole);
    Task<int> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole);
    Task<IEnumerable<UserRoleView>> GetUserRole(string userId);
}