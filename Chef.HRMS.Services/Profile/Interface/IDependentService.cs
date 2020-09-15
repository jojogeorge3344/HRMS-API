using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IDependentService : IAsyncService<Dependent>
    {
        Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId);
    }
}
