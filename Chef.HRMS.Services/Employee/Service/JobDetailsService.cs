using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class JobDetailsService : AsyncService<JobDetails>, IJobDetailsService
{
    private readonly IJobDetailsRepository jobDetailsRepository;

    public JobDetailsService(IJobDetailsRepository jobDetailsRepository)
    {
        this.jobDetailsRepository = jobDetailsRepository;
    }

    public async Task<IEnumerable<GroupCategory>> GetGroupCategory()
    {
        return await jobDetailsRepository.GetGroupCategory();
    }

    public async Task<IEnumerable<EmployeeDefaults>> GetProbationDetails()
    {
        return await jobDetailsRepository.GetProbationDetails();
    }
}