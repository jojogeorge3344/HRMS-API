using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollLeaveDetailsService : IAsyncService<PayrollLeaveDetails>
{
    Task<int> BulkInsertAsync(List<PayrollLeaveDetails> payrollLeaveDetails);
}
