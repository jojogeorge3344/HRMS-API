using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public interface IOverTimePolicyConfigurationService : IAsyncService<OverTimePolicyConfiguration>
    {
        Task<IEnumerable<int>> GetAllAssignedOverTimePolicies();
        Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId);
        Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId);

    }
}
