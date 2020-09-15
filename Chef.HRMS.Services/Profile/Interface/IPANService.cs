using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPANService : IAsyncService<PAN>
    {
        Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId);
    }
}
