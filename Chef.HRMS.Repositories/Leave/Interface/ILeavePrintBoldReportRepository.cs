namespace Chef.HRMS.Repositories;

public interface ILeavePrintBoldReportRepository : IBaseRepository
{
    Task<IEnumerable<LeaveRequestPrintBoldReport>> GetLeaveRequestDetailsAsync(int id);
}
