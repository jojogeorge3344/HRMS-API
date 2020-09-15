using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEducationRepository : IGenericRepository<Education>
    {
        Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId);
    }
}