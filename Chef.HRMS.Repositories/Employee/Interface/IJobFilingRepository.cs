using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IJobFilingRepository : IGenericRepository<JobFiling>
    {
        Task<int> GetWeekendPolicyById(int employeeId);
        Task<JobFiling> GetByEmployeeId(int employeeId);

    }
}