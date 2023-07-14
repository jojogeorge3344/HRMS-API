using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeRevisionOldService : IAsyncService<EmployeeRevisionOld>
{
    Task<EmployeeRevisionOld> GetEmployeeRevisionOld(int employeeRevisionId);
}