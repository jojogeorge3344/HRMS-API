using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollAdhocDetailsService : IAsyncService<PayrollAdhocDetails>
{
    Task<int> BulkInsertAsync(List<PayrollAdhocDetails> payrollAdhocDetails);
}
