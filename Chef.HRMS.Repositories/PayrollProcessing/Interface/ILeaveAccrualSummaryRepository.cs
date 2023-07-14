namespace Chef.HRMS.Repositories;

public interface ILeaveAccrualSummaryRepository : IGenericRepository<LeaveAccrualSummary>
{
    Task<LeaveAccrualSummary> GetPreviousAccrualSummary(int employeeId);
}
