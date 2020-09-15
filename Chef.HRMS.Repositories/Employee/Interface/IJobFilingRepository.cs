using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IJobFilingRepository : IGenericRepository<JobFiling>
    {
        Task<int> GetWeekendPolicyById(int employeeId);
    }
}