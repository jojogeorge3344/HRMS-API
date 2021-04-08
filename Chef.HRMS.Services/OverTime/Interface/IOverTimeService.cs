using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IOverTimeService : IAsyncService<OverTime>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel);
        Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId);
        Task<int> GetAssignedOverTimePolicy(int employeeId);
    }
}
