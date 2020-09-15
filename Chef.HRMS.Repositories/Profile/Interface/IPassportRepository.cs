using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPassportRepository : IGenericRepository<Passport>
    {
        Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId);
    }
}