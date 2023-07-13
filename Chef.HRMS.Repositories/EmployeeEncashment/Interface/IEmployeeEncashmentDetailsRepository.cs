using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeEncashmentDetailsRepository : IGenericRepository<Chef.HRMS.Models.EmployeeEncashmentDetails>
    {
        Task<int> DeleteByEncashmentId(int encashmentId);
        Task<IEnumerable<Chef.HRMS.Models.EmployeeEncashmentDetails>> GetByEncashmentId(int encashmentId);
    }
}
