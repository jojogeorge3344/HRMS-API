 

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeRevisionRepository : IGenericRepository<EmployeeRevision>
    {
        Task<EmployeeRevisionView> GetEmployeeDetail(int employeeId);
    }
}