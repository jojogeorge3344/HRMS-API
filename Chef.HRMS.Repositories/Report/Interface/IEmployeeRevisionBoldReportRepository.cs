namespace Chef.HRMS.Repositories.Report;

public interface IEmployeeRevisionBoldReportRepository : IBaseRepository
{
    Task<EmployeeRevisionOldDetailsBoldDto> GetemployeeOldDetailsAsync(int id);
    Task<EmployeeRevisionNewDetailsBoldDto> GetemployeeNewDetailsAsync(int id);
    Task<IEnumerable<EmployeeSalarayDto>> GetSalaryOldDetailsAsync(int id);
    Task<IEnumerable<EmployeeSalarayDto>> GetSalaryNewDetailsAsync(int id);
}

