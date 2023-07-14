using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollLoanDetailsService : IAsyncService<PayrollLoanDetails>
{
    Task<int> BulkInsertAsync(List<PayrollLoanDetails> payrollLoanDetails);
}
