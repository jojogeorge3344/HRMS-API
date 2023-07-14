using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollComponentService : IAsyncService<PayrollComponent>
{
    Task<IEnumerable<int>> GetAllAssignedPayrollComponents();
    Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType);
    Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent();
    Task<IEnumerable<BenefitTypes>> GetComponentType();
    Task<bool> IsPayrollComponentCodeExist(string code);
}