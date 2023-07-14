

namespace Chef.HRMS.Repositories;

public interface IEmployeeRevisionDetailsRepository : IGenericRepository<EmployeeRevisionDetails>
{
    Task<IEnumerable<EmployeeRevisionSalaryView>> GetEmployeeRevisionSalaryDetails(int payrollStructureId, int employee);
    Task<int> InsertAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails);

    Task<IEnumerable<EmployeeRevisionDetails>> GetEmployeeRevisionSalaryDetail(int employeeRevisionId);
    Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetails> employeeRevisionDetails);


}