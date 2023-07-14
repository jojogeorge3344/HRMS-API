using Chef.HRMS.Models;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface ILeaveAccrualSummaryService : IAsyncService<LeaveAccrualSummary>
{
    Task<int> GenerateAndInsertLeaveAccrualSummary(List<LeaveAccrual> leaveAccruals);
}
