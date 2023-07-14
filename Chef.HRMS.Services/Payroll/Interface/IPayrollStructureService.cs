using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollStructureService : IAsyncService<PayrollStructure>
{
    Task<IEnumerable<int>> GetAllAssignedPayrollStructure();
    Task<IEnumerable<PayrollStructure>> GetAllConfiguredPayrollStructures();
    Task<int> UpdatePayrollStructure(int id, bool isConfigured);
    Task<IEnumerable<SystemVariable>> GetAllActived(int payrollstructureid);
}