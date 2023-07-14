using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeavePrintBoldReportService : BaseService, ILeavePrintBoldReportService
{
    private readonly ILeavePrintBoldReportRepository leavePrintBoldReportRepository;
    public LeavePrintBoldReportService(ILeavePrintBoldReportRepository leavePrintBoldReportRepository)
    {
        this.leavePrintBoldReportRepository = leavePrintBoldReportRepository;
    }

    public async Task<IEnumerable<LeaveRequestPrintBoldReport>> GetLeaveRequestDetailsAsync(int id)
    {
        var result = await leavePrintBoldReportRepository.GetLeaveRequestDetailsAsync(id);
        return result;
    }

}