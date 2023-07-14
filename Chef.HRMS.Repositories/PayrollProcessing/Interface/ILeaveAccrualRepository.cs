namespace Chef.HRMS.Repositories;

public interface ILeaveAccrualRepository : IGenericRepository<LeaveAccrual>
{
    Task<IEnumerable<LeaveAccrual>> GetProcessedLeaveAccruals(DateTime accrualDate);
    Task<IEnumerable<LeaveAccrual>> GetLeaveAccrualsByPayrollProcessingId(int payrollProcessingId);
    Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId);
}
