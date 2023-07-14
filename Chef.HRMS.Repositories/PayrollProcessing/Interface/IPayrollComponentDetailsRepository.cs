using Chef.Common.Core.Services;

namespace Chef.HRMS.Repositories;

public interface IPayrollComponentDetailsRepository : IAsyncService<PayrollComponentDetails>
{
    Task<int> BulkInsertAsync(List<PayrollComponentDetails> payrollComponent);
    Task<int> DeleteByPayrollProcessID(int payrollProcessID, int stepNo);
    Task<IEnumerable<PayrollComponentDetails>> GetPayslipYears();
}
