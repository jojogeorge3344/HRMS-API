

namespace Chef.HRMS.Repositories;

public interface IEmployeeRevisionOldRepository : IGenericRepository<EmployeeRevisionOld>
{
    Task<EmployeeRevisionOld> GetEmployeeRevisionOld(int employeeRevisionId);
}