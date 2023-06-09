using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Employee;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeRevisionService : IAsyncService<EmployeeRevision>
    {
        Task<EmployeeRevisionOld> GetEmployeeDetail(int employeeId);
        Task<IEnumerable<EmployeeRevisionStructureView>> GetPayrollComponent(int payrollStructureId);
        Task<IEnumerable<EmployeeRevisionPayrollStructureView>> GetPayrollStructureComponent(int payrollStructureId);
        Task<int> UpdateEmployeeRevisionStatus(int employeeRevisionid,int status);
        Task<int> EmployeeRevisionProcess(int employeeRevisionid);
        Task<int> InsertAsync(EmployeeRevisionDTO employeeRevisionDTO);
        Task<bool> IsEmployeeRevisionApproved(int employeeRevisionId);
    }
}