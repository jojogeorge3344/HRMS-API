using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollComponentDetailsService : IAsyncService<PayrollComponentDetails>
{
    Task<int> DeleteByPayrollProcessID(int payrollProcessID, int stepNo);
    Task<IEnumerable<PayrollComponentDetails>> GetPayslipYears();

}
