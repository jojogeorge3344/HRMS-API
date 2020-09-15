using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPreviousEmploymentService : IAsyncService<PreviousEmployment>
    {
        Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId);
    }
}
