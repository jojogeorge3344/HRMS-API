using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IJobTitleServices : IAsyncService<JobTitle>
{
    Task<IEnumerable<JobTitleView>> GetAllJobTitleList();
}