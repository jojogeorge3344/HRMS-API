using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IOverTimeRepository : IGenericRepository<OverTime>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel);
        Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId);
        Task<int> GetAssignedOverTimePolicy(int employeeId);
        Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId);
        Task<IEnumerable<CalenderView>> GetCalenderDetails(int employeeId);
    }
}
