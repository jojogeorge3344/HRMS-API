using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollBasicComponentService : IAsyncService<PayrollBasicComponent>
    {
        Task<IEnumerable<EmployeeSalaryConfigurationView>> GetBasicComponentsByPaygroup(int paygoupId, int year, int month);

        Task<int> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents);

        Task<IEnumerable<PayrollBasicComponent>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId);

        Task<IEnumerable<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId);

        Task<IEnumerable<EmployeeSalaryConfigurationView>> GetPayrollBasicComponentByEmployeeId(int employeeId);
        Task<int> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents);
    }
}
