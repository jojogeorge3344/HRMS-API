using Chef.Common.Models;
using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IJobFilingService : IAsyncService<JobFiling>
    {
        Task<int> GetWeekendPolicyById(int employeeId);
        Task<JobFiling> GetByEmployeeId(int employeeId);
    }
}