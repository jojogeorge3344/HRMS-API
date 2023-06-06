using Chef.Common.Services;
using Chef.HRMS.Models;

namespace Chef.HRMS.Services
{
    public interface IJobDetailsService : IAsyncService<JobDetails>
    {
        Task<IEnumerable<GroupCategory>> GetGroupCategory(); 
        Task<IEnumerable<EmployeeDefaults>> GetProbationDetails();
    }
}