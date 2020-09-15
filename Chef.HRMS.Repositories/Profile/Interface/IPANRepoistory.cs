using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPANRepository : IGenericRepository<PAN>
    {
        Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId);
    }
}