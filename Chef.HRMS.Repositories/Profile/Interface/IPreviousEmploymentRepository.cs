using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPreviousEmploymentRepository : IGenericRepository<PreviousEmployment>
    {
        Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId);
    }
}