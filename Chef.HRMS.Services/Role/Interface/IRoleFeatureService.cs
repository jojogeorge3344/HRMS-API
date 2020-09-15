using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IRoleFeatureService : IAsyncService<RoleFeature>
    {
        Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature);
    }
}