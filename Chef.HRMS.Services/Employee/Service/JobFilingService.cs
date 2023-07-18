using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class JobFilingService : AsyncService<JobFiling>, IJobFilingService
{
    private readonly IJobFilingRepository jobFilingRepository;

    public JobFilingService(IJobFilingRepository jobFilingRepository)
    {
        this.jobFilingRepository = jobFilingRepository;
    }

    public async Task<JobFiling> GetByEmployeeId(int employeeId)
    {
        return await jobFilingRepository.GetByEmployeeId(employeeId);
    }

    public async Task<int> GetWeekendPolicyById(int employeeId)
    {
        return await jobFilingRepository.GetWeekendPolicyById(employeeId);
    }
}