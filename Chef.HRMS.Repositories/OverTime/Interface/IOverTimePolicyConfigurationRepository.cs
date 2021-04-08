using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IOverTimePolicyConfigurationRepository : IGenericRepository<OverTimePolicyConfiguration>
    {
        Task<IEnumerable<int>> GetAllAssignedOverTimePolicies();
        Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId);
        Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId);
    }
}
