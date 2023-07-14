using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILoanPrintBoldReportService : IBaseService
{
    Task<IEnumerable<LoanPrintBoldReport>> GetLoanDetailsAsync(int id);
}
