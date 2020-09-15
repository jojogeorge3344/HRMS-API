using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IDependentRepository : IGenericRepository<Dependent>
    {
        Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId);
    }
}