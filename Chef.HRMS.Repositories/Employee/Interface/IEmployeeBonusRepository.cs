using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeBonusRepository : IGenericRepository<EmployeeBonus>
    {
        Task<IEnumerable<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId);

        Task<IEnumerable<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId);
        Task<IEnumerable<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId, int payrollProcessingMethodId);

        Task<int> DeleteAllBonusByEmployeeId(int employeeId);
    }
}
