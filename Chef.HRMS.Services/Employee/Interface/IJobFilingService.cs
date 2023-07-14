using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IJobFilingService : IAsyncService<JobFiling>
{
    Task<int> GetWeekendPolicyById(int employeeId);
    Task<JobFiling> GetByEmployeeId(int employeeId);
}