using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeavePrintBoldReportService : IBaseService
{
    Task<IEnumerable<LeaveRequestPrintBoldReport>> GetLeaveRequestDetailsAsync(int id);
}
