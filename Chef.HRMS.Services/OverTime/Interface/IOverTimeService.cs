using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

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
    Task<IEnumerable<OverTimeDetailsView>> GetOverTimeValidation(IEnumerable<OverTimeDetailsView> overTimeDetailsViews);
}
