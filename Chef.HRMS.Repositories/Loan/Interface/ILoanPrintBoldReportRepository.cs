namespace Chef.HRMS.Repositories;

public interface ILoanPrintBoldReportRepository : IBaseRepository
{
    Task<IEnumerable<LoanPrintBoldReport>> GetLoanDetailsAsync(int id);
}
