using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IOnDutyService : IAsyncService<OnDuty>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<OnDutyNotifyPersonnel> onDutyNotifyPersonnel);
        Task<IEnumerable<OnDuty>> GetTotalRequestedDaysById(int employeeId);
        Task<IEnumerable<JobDetails>> GetJoinDateByEmployeeId(int employeeId);
    }
}
