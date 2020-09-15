using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IOverTimePolicyService : IAsyncService<OverTimePolicy>
    {
        Task<IEnumerable<int>> GetAllAssignedOverTimePolicy();
        Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount();
        Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies();
        Task<int> UpdateOverTimePolicy(int id);

    }
}
