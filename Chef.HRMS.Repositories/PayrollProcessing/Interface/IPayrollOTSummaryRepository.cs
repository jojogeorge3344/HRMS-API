namespace Chef.HRMS.Repositories;

public interface IPayrollOTSummaryRepository : IGenericRepository<PayrollOTSummary>
{
    Task<int> DeleteByPayrollProcessID(int payrollProcessID);
}
