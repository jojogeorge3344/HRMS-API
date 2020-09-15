using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEducationService : IAsyncService<Education>
    {
        Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId);
    }
}
