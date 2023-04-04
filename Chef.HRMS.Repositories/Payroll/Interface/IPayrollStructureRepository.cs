using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IPayrollStructureRepository : IGenericRepository<PayrollStructure>
    {
        Task<IEnumerable<int>> GetAllAssignedPayrollStructure();
        Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures();
        Task<int> UpdatePayrollStructure(int id, bool isConfigured);
        Task<IEnumerable<PayrollStructure>> GetAllActived(int payrollstructureid);

    }
}