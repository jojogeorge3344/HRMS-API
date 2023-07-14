using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeRevisionDetailsService : IAsyncService<EmployeeRevisionDetails>
{
    Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId, int employee);
    Task<int> InsertAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails);
    Task<IEnumerable<EmployeeRevisionDetails>> GetEmployeeRevisionSalaryDetail(int employeeRevisionId);
    Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails);
}