using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IWPSUserService : IAsyncService<WPSUser>
    {
        Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId);
        Task<IEnumerable<HRMSBank>> GetBank();
    }
}
