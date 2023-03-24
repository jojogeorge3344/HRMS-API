using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IWPSUserRepository : IGenericRepository<WPSUser>
    {
        Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId);

        Task<int> Update(WPSUser wpsUser);
        Task<IEnumerable<HRMSBank>> GetBank();

    }
}
