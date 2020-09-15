using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IUniqueIdentificationDetailRepository : IGenericRepository<UniqueIdentificationDetail>
    {
        Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId);
    }
}