using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayGroupService : IAsyncService<PayGroup>
    {
        Task<IEnumerable<int>> GetAllAssignedPayGroup();
        Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId,int year,int month );
    }
}
