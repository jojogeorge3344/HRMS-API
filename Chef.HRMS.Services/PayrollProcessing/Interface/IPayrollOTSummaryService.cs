using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollOTSummaryService : IAsyncService<PayrollOTSummary>
{
    Task<int> BulkInsertAsync(List<PayrollOTSummary> payrollOTSummaries);
}
