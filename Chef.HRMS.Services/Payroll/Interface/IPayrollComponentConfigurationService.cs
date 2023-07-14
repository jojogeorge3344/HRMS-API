using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPayrollComponentConfigurationService : IAsyncService<PayrollComponentConfiguration>
{
    Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollStuctureId(int payrollStructureId);
    Task<int> InsertAsync(IEnumerable<PayrollComponentConfiguration> payrollComponentConfiguration, IEnumerable<int> PayrollComponentConfigurationIds);
    Task<IEnumerable<PayrollComponentConfiguration>> GetAllByPayrollComponentId(int payrollComponentId);
    Task<int> DeletePayrollComponent(int id);
}