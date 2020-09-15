using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IRoleFeatureRepository : IGenericRepository<RoleFeature>
    {
        Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature);
    }
}