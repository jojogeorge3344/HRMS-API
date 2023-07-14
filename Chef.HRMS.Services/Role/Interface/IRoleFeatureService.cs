using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IRoleFeatureService : IAsyncService<RoleFeature>
{
    Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature);
}