using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollComponentService : IAsyncService<PayrollComponent>
    {
        Task<IEnumerable<int>> GetAllAssignedPayrollComponents();
        Task<IEnumerable<PayrollComponent>> GetAllPayrollComponentByType(int payrollComponentType);
        Task<IEnumerable<PayrollComponent>> GetAllOrderByPayrollComponent();
        Task<IEnumerable<BenefitTypes>> GetComponentType();
        Task<bool> IsPayrollComponentCodeExist(string code);
    }
}