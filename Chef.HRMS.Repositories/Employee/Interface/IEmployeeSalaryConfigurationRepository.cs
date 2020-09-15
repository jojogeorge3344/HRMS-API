using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeSalaryConfigurationRepository : IGenericRepository<EmployeeSalaryConfiguration>
    {
        Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId);

        Task<int> DeleteByEmployeeId(int employeeId);
    }
}
