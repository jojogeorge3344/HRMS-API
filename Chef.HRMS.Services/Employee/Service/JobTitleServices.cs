using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class JobTitleServices : AsyncService<JobTitle>, IJobTitleServices
{
    private readonly IJobTitleRepository jobTitleRepository;

    public JobTitleServices(IJobTitleRepository jobTitleRepository)
    {
        this.jobTitleRepository = jobTitleRepository;
    }

    public async Task<IEnumerable<JobTitleView>> GetAllJobTitleList()
    {
        return await jobTitleRepository.GetAllJobTitleList();
    }
}