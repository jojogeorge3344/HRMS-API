using Chef.HRMS.Models;

namespace Chef.HRMS.Services.Report;

public interface IEmployeeRevisionBoldService : IBaseService
{
    Task<EmployeeRevisionOldDetailsBoldDto> GetemployeeOldDetailsAsync(int id);
    Task<EmployeeRevisionNewDetailsBoldDto> GetemployeeNewDetailsAsync(int id);
    Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id);
    Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id);

}

