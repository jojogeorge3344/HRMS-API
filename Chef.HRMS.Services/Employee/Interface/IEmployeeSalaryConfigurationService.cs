using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeSalaryConfigurationService : IAsyncService<EmployeeSalaryConfiguration>
    {
        Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId);

        Task<int> DeleteByEmployeeId(int employeeId);
    }
}
