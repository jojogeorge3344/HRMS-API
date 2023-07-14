using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IProcessedSalaryReportService : IAsyncService<ProcessedSalaryDetailsView>
{
    Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet);
}
