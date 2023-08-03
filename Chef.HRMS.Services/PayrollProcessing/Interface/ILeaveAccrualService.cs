using Chef.HRMS.Models;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface ILeaveAccrualService : IAsyncService<LeaveAccrual>
{
    Task<IEnumerable<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid, int month, int year);
    Task<int> GenerateLeaveAvailed(LeaveAccrual leaveAvailedDetails);
    Task<int> InsertLeaveAccruals(List<LeaveAccrual> leaveAccruals);
    Task<List<LeaveAccrual>> GetGeneratedLeaveAccruals(int paygroupid);
    Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId);
}
