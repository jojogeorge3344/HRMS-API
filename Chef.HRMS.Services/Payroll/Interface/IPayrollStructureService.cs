using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollStructureService : IAsyncService<PayrollStructure>
    {
        Task<IEnumerable<int>> GetAllAssignedPayrollStructure();
        Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures();
        Task<int> UpdatePayrollStructure(int id, bool isConfigured);
        Task<IEnumerable<PayrollStructure>> GetAllActived(int payrollstructureid);
    }
}