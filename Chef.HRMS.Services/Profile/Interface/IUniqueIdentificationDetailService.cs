using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IUniqueIdentificationDetailService : IAsyncService<UniqueIdentificationDetail>
    {
        Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId);
    }
}
