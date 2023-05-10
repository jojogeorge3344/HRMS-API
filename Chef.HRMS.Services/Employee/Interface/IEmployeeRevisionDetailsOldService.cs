using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeRevisionDetailsOldService : IAsyncService<EmployeeRevisionDetailsOld>
    {
        Task <int> InsertAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld);
     Task<IEnumerable<EmployeeRevisionDetailsOld>> GetOldEmployeeRevisionSalaryDetail(int employeeRevisionId);
        Task<int>UpdateAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld);
    }
}