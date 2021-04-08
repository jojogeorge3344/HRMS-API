using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IOverTimePolicyRepository : IGenericRepository<OverTimePolicy>
    {
        Task<IEnumerable<int>> GetAllAssignedOverTimePolicy();
        Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount();
        Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies();
        Task<int> UpdateOverTimePolicy(int id);
    }
}
