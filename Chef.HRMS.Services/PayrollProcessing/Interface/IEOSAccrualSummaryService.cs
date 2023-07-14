using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Services.PayrollProcessing.Interface;

public interface IEOSAccrualSummaryService : IAsyncService<EOSAccrualSummary>
{
    Task<int> GenerateAndInsertEOSAccrualSummary(List<EOSAccrual> eosAccruals);
}
