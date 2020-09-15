using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IDrivingLicenseRepository : IGenericRepository<DrivingLicense>
    {
        Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId);
    }
}