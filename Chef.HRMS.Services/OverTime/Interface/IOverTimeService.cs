using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chef.Common.Core.Services;

namespace Chef.HRMS.Services
{
    public interface IOverTimeService : IAsyncService<OverTime>
    {
        Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel);
        Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId);
        Task<int> GetAssignedOverTimePolicy(int employeeId);
        Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId);
        Task<IEnumerable<CalenderView>> GetCalenderDetails(int employeeId);
        Task<int> UpdateNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel);
		Task<IEnumerable<OverTimePayrollViewModel>> GetOvertimeByPaygroupId(int paygroupId, string fromDate, string toDate);
        Task<byte[]> OverTimeExcelTemplate();
        Task<int> OverTimeBulkInsert(IEnumerable<OverTime> overTimes);

    }
}
