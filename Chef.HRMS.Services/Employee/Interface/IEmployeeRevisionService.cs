using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeRevisionService : IAsyncService<EmployeeRevision>
    {
        Task<EmployeeRevisionView> GetEmployeeDetail(int employeeId);
        Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId);
        Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid);
    }
}