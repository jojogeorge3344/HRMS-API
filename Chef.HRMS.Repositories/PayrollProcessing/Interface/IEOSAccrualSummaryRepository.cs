using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories;

public interface IEOSAccrualSummaryRepository : IGenericRepository<EOSAccrualSummary>
{
    Task<EOSAccrualSummary> GetPreviousEOSAccrualSummary(int employeeId);
}
