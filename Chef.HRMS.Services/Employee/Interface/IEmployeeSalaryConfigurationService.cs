using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeSalaryConfigurationService : IAsyncService<EmployeeSalaryConfiguration>
{
    Task<IEnumerable<EmployeeSalaryConfigurationView>> GetSalaryConfigurationByEmployeeId(int employeeId);

    Task<int> DeleteByEmployeeId(int employeeId);
}
